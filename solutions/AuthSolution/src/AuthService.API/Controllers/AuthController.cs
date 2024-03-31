using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

using AuthService.Core.Entities;
using AuthService.Infrastructure;
using Microsoft.AspNetCore.Authorization;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AuthService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly string privateKeyFile = "key.pem";
        private readonly string Issuer;
        private readonly string Audience;
        private readonly DateTime AccessTokenExpire = DateTime.Now.AddMinutes(15);
        private readonly DateTime RefreshTokenExpire = DateTime.Now.AddDays(7);
        private readonly string RefreshTokenCookieName = "refresh-token";

        public AuthController()
        {
            _context = new ApplicationDbContext();
            Issuer = Environment.GetEnvironmentVariable("Jwt__Issuer") ?? "";
            Audience = Environment.GetEnvironmentVariable("Jwt__Audience") ?? "";
        }
        [HttpGet("Refresh")]
        public ActionResult<TokenModel> Refresh()
        {
            var refreshToken = Request.Cookies[RefreshTokenCookieName];

            Token? token = ValidateRefreshToken(refreshToken);
            if (token == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Refresh token is not valid");
            }
            var user = _context.Users
                               .Include(u => u.Account)
                                   .ThenInclude(acc => acc.Token)
                               .Where(u => u.Account.Token.Id == token.Id)
                               .SingleOrDefault();
            string? accessToken = GenerateAccessToken(user, AccessTokenExpire);
            if (accessToken == null)
            {
                return BadRequest("Secret key or issuer or audience is undefined");
            }

            return Ok(new TokenModel
            {
                Token = accessToken
            });
        }

        [Authorize]
        [HttpGet("Me")]
        public ActionResult<User> Me()
        {
            var CurrentUserClaim = GetCurrentUserClaim();
            if (CurrentUserClaim == null)
            {
                return Unauthorized("User didn't log in");
            }
            var user = _context.Users.Where(u => u.Id == CurrentUserClaim.UserId).SingleOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        // POST api/login
        [HttpPost("Login")]
        public ActionResult<TokenModel> Login([FromBody] UserLoginModel userLoginModel)
        {
            Account? account;
            User? user;
            account = _context.Accounts
                              .Where(acc => acc.PhoneNumber == userLoginModel.PhoneNumber
                                    && acc.Password == userLoginModel.Password)
                              .SingleOrDefault();
            if (account == null)
            {
                return NotFound("Account not found");
            }
            user = _context.Users
                           .Include(u => u.Account)
                                .ThenInclude(acc => acc.Token)
                           .Where(u => u.Id == account.UserId)
                           .SingleOrDefault();
            if (user == null)
            {
                return NotFound("User not found");
            }
            string? accessToken = GenerateAccessToken(user, AccessTokenExpire);
            var refreshToken = GenerateRefreshToken(RefreshTokenExpire);

            user.Account.Token.RefreshToken = refreshToken.Token;
            user.Account.Token.RefreshTokenCreated = refreshToken.TokenCreatedAt;
            user.Account.Token.RefreshTokenExpired = refreshToken.TokenExpiredAt;

            _context.Users.Update(user);
            int affectedRow = _context.SaveChanges();
            if (affectedRow <= 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
            }

            if (accessToken == null)
            {
                return BadRequest("Secret key or issuer or audience is undefined");
            }
            var token = new TokenModel
            {
                Token = accessToken
            };
            // Add refresh token to httpOnly Cookie
            if (refreshToken.Token != null)
            {
                Response.Cookies.Append(RefreshTokenCookieName, refreshToken.Token, new CookieOptions
                {
                    Expires = refreshToken.TokenExpiredAt ?? DateTime.Now,
                    // This attribute allow to use cookie at server-side, not client-side,
                    // which help prevent Cross-Site Scripting (XSS) attacks
                    HttpOnly = true,
                    // Enable HTTPS
                    Secure = true,
                    // Allow cookie to be sent with request.
                    // However, this would be exposed to cross-site request forgery (CSRF) attacks 
                    SameSite = SameSiteMode.None
                });
            }

            return Ok(token);
        }
        // POST api/login
        [HttpPost("Register")]
        public ActionResult<TokenModel> Register([FromBody] User user)
        {
            var account = _context.Accounts
                                  .Where(acc => acc.PhoneNumber == user.Account.PhoneNumber)
                                  .SingleOrDefault();
            if (account != null)
            {
                return StatusCode(StatusCodes.Status406NotAcceptable, new { message = "phone number is already exist" });
            }
            try
            {
                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, $"Failed to register user:\n {ex.Message}");
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("Logout")]
        public ActionResult Logout()
        {
            Response.Cookies.Append(RefreshTokenCookieName, "", new CookieOptions
            {
                Expires = DateTime.Now.AddDays(-1),
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return NoContent();
        }

        /**
         * The key is the variable from appsettings.json
         */
        private string? GenerateAccessToken(User? user, DateTime exp)
        {
            if (Issuer == "" || Audience == "" || user == null)
            {
                return null;
            }
            string privateKeyContent = System.IO.File.ReadAllText(privateKeyFile);
            using (RSA rsa = RSA.Create())
            {
                rsa.ImportFromPem(privateKeyContent.ToCharArray());

                var securityKey = new RsaSecurityKey(rsa);
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256)
                {
                    // Reference: https://stackoverflow.com/questions/62307933/rsa-disposed-object-error-every-other-test
                    // This will solve rsa dispose error every test case
                    CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
                };

                var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.GivenName,user.Name),
            };

                var token = new JwtSecurityToken(
                    Issuer,
                    Audience,
                    claims,
                    expires: exp,
                    signingCredentials: credentials);

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
        }

        private RefreshTokenModel GenerateRefreshToken(DateTime exp)
        {
            var refreshToken = new RefreshTokenModel
            {
                Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)),
                TokenCreatedAt = DateTime.Now,
                TokenExpiredAt = exp
            };
            return refreshToken;
        }
        private Token? ValidateRefreshToken(string? refreshToken)
        {
            if (refreshToken == null)
            {
                return null;
            }
            var token = _context.Tokens
                                .Where(tok => tok.RefreshToken == refreshToken)
                                .SingleOrDefault();
            if (token == null ||
                token.RefreshTokenExpired != null
                && token.RefreshTokenExpired < DateTime.Now)
            {
                return null;
            }
            return token;
        }
        private UserClaim? GetCurrentUserClaim()
        {
            var indentity = HttpContext.User.Identity as ClaimsIdentity;
            if (indentity == null)
            {
                return null;
            }
            var userClaims = indentity.Claims;
            return new UserClaim
            {
                UserId = int.Parse(userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value),
                Name = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
            };
        }


    }

    public class UserLoginModel
    {
        [Required]
        [JsonPropertyName("phoneNumber")]
        public string? PhoneNumber { get; set; }

        [Required]
        [JsonPropertyName("password")]
        public string? Password { get; set; }
    }
    public class TokenModel
    {
        [Required]
        [JsonPropertyName("token")]
        public string? Token { get; set; }
    }
    public class RefreshTokenModel
    {
        [Required]
        [JsonPropertyName("refreshToken")]
        public string? Token { get; set; }
        public DateTime? TokenCreatedAt { get; set; } = DateTime.Now;
        public DateTime? TokenExpiredAt { get; set; }
    }
    public class UserClaim
    {
        [Required]
        public int UserId;
        [Required]
        public string? Name;
    }
}
