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
        public async Task<IActionResult> Login([FromBody] UserLoginModel userLoginModel)
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
            var token = Generate(user);
            return Ok(token);
        }

        private string Generate(User user)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            IConfigurationSection jwtSection = config.GetSection("Jwt");
            var secretKey = jwtSection["Key"];
            var issuer = jwtSection["Issuer"];
            var audience = jwtSection["Audience"];

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
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
}
