using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
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
            return Ok(user);
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
