﻿using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly string privateKeyFile = "key.pem";
        private readonly string Issuer;
        private readonly string Audience;
        private readonly DateTime AccessTokenExpire = DateTime.Now.AddMinutes(15);
        private readonly DateTime RefreshTokenExpire = DateTime.Now.AddDays(7);
        private readonly string RefreshTokenCookieName = "refresh-token";

        public AuthController()
        {
            _userRepository = new UserRepository();
            Issuer = Environment.GetEnvironmentVariable("Jwt__Issuer") ?? "";
            Audience = Environment.GetEnvironmentVariable("Jwt__Audience") ?? "";
        }
        [HttpGet("Refresh")]
        public ActionResult<TokenModel> Refresh()
        {
            var refreshToken = Request.Cookies[RefreshTokenCookieName];

            User? user = ValidateRefreshToken(refreshToken);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Refresh token is not valid");
            }
            string? accessToken = GenerateAccessToken(user, AccessTokenExpire);
            if (accessToken == null)
            {
                return BadRequest("Secret key or issuer or audience is undefined");
            }
            var token = new TokenModel
            {
                Token = accessToken
            };
            return Ok(token);
        }
        // POST api/login
        [HttpPost("Login")]
        public ActionResult<TokenModel> Login([FromBody] UserLoginModel userLoginModel)
        {
            User? user;
            try
            {
                user = _userRepository.GetByPhoneNumberAndPassword(userLoginModel.PhoneNumber, userLoginModel.Password);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            if (user == null)
            {
                return NotFound();
            }

            string? accessToken = GenerateAccessToken(user, AccessTokenExpire);
            var refreshToken = GenerateRefreshToken(RefreshTokenExpire);

            user.RefreshToken = refreshToken.Token;
            user.RefreshTokenCreated = refreshToken.TokenCreatedAt;
            user.RefreshTokenExpired = refreshToken.TokenExpiredAt;

            int affectedRow = _userRepository.Update(user);
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
            if (_userRepository.GetByPhoneNumber(user.PhoneNumber) != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "phone number is already exist" });
            }
            try
            {
                _userRepository.Add(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
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
        private string? GenerateAccessToken(User user, DateTime exp)
        {
            if (Issuer == "" || Audience == "")
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
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.MobilePhone,user.PhoneNumber),
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
        private User? ValidateRefreshToken(string? refreshToken)
        {
            if (refreshToken == null)
            {
                return null;
            }
            User? user = _userRepository.GetByRefreshToken(refreshToken);
            if (user == null ||
                (user.RefreshTokenExpired != null
                && user.RefreshTokenExpired < DateTime.Now))
            {
                return null;
            }
            return user;
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
}
