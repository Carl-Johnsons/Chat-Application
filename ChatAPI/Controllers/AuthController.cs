using Azure.Core;
using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private const string SECRET_KEY = "Key";
        IUserRepository _userRepository;
        private string SecretKey;
        private string Issuer;
        private string Audience;
        private const int AccessTokenExpireMinutes = 15;
        private const int RefreshTokenExpireDays = 7;

        public AuthController()
        {
            _userRepository = new UserRepository();
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            IConfigurationSection jwtSection = config.GetSection("Jwt");
            SecretKey = jwtSection[SECRET_KEY] ?? "";
            Issuer = jwtSection["Issuer"] ?? "";
            Audience = jwtSection["Audience"] ?? "";
        }

        // POST api/login
        [HttpPost("Login")]
        public async Task<ActionResult<TokenModel>> Login([FromBody] UserLoginModel userLoginModel)
        {
            User? user;
            try
            {
                user = _userRepository.Login(userLoginModel.PhoneNumber, userLoginModel.Password);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            if (user == null)
            {
                return NotFound();
            }

            string? accessToken = GenerateAccessToken(user, DateTime.Now.AddMinutes(AccessTokenExpireMinutes));
            var refreshToken = GenerateRefreshToken(DateTime.Now.AddDays(RefreshTokenExpireDays));

            user.RefreshToken = refreshToken.Token;
            user.RefreshTokenCreated = refreshToken.TokenCreatedAt;
            user.RefreshTokenExpired = refreshToken.TokenExpiredAt;

            _userRepository.UpdateUser(user);

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
        [HttpPost("Register")]
        public async Task<ActionResult<TokenModel>> Register([FromBody] User user)
        {
            if (_userRepository.GetUserByPhoneNumber(user.PhoneNumber) != null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "phone number is already exist" });
            }
            try
            {
                _userRepository.InsertUser(user);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return StatusCode(StatusCodes.Status201Created);
        }

        [HttpPost("RefreshToken")]
        public async Task<ActionResult<TokenModel>> RefreshToken([FromBody] RefreshTokenModel refreshTokenModel)
        {
            if (refreshTokenModel == null)
            {
                return BadRequest("Refresh token is null");
            }

            User? user = ValidateRefreshToken(refreshTokenModel);
            if (user == null)
            {
                return StatusCode(StatusCodes.Status403Forbidden, "Refresh token is not valid");
            }
            string? accessToken = GenerateAccessToken(user, DateTime.Now.AddMinutes(AccessTokenExpireMinutes));
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


        /**
         * The key is the variable from appsettings.json
         */
        private string? GenerateAccessToken(User user, DateTime exp)
        {
            if (SecretKey == "" || Issuer == "" || Audience == "")
            {
                return null;
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
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
        private User? ValidateRefreshToken(RefreshTokenModel refreshToken)
        {
            User? user = _userRepository.GetUserByRefreshToken(refreshToken.Token);
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
