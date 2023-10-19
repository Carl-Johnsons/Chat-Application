using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        IUserRepository _userRepository;
        public UsersController() => _userRepository = new UserRepository();

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<User> userList = (List<User>)_userRepository.GetUserList();

            if (userList.IsNullOrEmpty())
            {
                return NotFound();
            }
            return Ok(userList);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var user = _userRepository.GetUserByID(id);
            if (user == null)
            {
                return NotFound();

            }
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            _userRepository.InsertUser(user);
            return CreatedAtAction("Get", new { id = user.UserId }, user);
        }

        [HttpPost("Login/{phoneNumber}/{password}")]
        public async Task<IActionResult> Login(string? phoneNumber, string? password)
        {
            User? user = null;
            try
            {
                user = _userRepository.Login(phoneNumber, password);
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

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("Id mismatch when updating user");
            }

            int affectedRow = _userRepository.UpdateUser(user);
            if (affectedRow == 0)
            {
                return NotFound();
            }

            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            int affectRow = _userRepository.DeleteUser(id);
            if (affectRow == 0)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
