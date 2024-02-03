using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.ComponentModel.DataAnnotations;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        IUserRepository _userRepository;
        public AuthController()
        {
            _userRepository = new UserRepository();
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

            string? accessToken = GenerateAccessToken(user);
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
        private static string? GenerateAccessToken(User user)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            IConfigurationSection jwtSection = config.GetSection("Jwt");
            var secretKey = jwtSection["Key"];
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];

            if (secretKey == null || issuer == null || audience == null)
            {
                return null;
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
                new Claim(ClaimTypes.NameIdentifier,user.UserId.ToString()),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.MobilePhone,user.PhoneNumber),
                new Claim(ClaimTypes.GivenName,user.Name),
            };

            var token = new JwtSecurityToken(
                issuer,
                audience,
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
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
}
