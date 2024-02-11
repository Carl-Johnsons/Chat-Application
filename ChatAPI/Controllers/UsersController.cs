using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using DataAccess.Repositories.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // using built in ASP.NET filter
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IFriendRepository _friendRepository;
        private readonly IFriendRequestRepository _friendRequestRepository;
        private readonly string BASE_ADDRESS = "https://localhost:7190";
        private UserClaim CurrentUserClaim => GetCurrentUserClaim();
        public UsersController()
        {
            _userRepository = new UserRepository();
            _friendRepository = new FriendRepository();
            _friendRequestRepository = new FriendRequestRepository();
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
                Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                PhoneNumber = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.MobilePhone)?.Value,
                Name = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
            };
        }

        // GET: api/<UsersController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            List<User> userList = _userRepository.Get();

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
            var user = _userRepository.Get(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet("GetUserProfile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var user = _userRepository.Get(CurrentUserClaim.UserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet("GetFriend/{userId}")]
        public async Task<IActionResult> GetFriend(int userId)
        {
            var friends = _friendRepository.GetByUserId(userId);
            if (friends == null)
            {
                return NotFound();

            }
            return Ok(friends);
        }
        [HttpGet("Search/{phoneNumber}")]
        public async Task<IActionResult> Search(string phoneNumber)
        {
            if (phoneNumber == null)
            {
                return NotFound();
            }
            try
            {
                var user = _userRepository.GetByPhoneNumber(phoneNumber);
                if (user == null)
                {
                    return NotFound();
                }
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest("Aborting search for user by phone number:\n" + ex.Message);
            }

        }
        [HttpGet("GetFriendRequestsByReceiverId/{receiverId}")]
        public async Task<IActionResult> GetFriendRequestsByReceiverId(int? receiverId)
        {
            if (receiverId == null)
            {
                return NotFound();
            }

            try
            {
                var friendRequestsList = _friendRequestRepository.GetByReceiverId((int)receiverId);
                if (friendRequestsList.IsNullOrEmpty())
                {
                    return NotFound();
                }
                return Ok(friendRequestsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("GetFriendRequestsBySenderId/{senderId}")]
        public async Task<IActionResult> GetFriendRequestsBySenderId(int? senderId)
        {
            if (senderId == null)
            {
                return NotFound();
            }

            try
            {
                var friendRequestsList = _friendRequestRepository.GetBySenderId((int)senderId);
                if (friendRequestsList.IsNullOrEmpty())
                {
                    return NotFound();
                }
                return Ok(friendRequestsList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<UsersController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.UserId }, user);
        }

        [HttpPost("SendFriendRequest")]
        public async Task<IActionResult> SendFriendRequest([FromBody] FriendRequest friendRequest)
        {
            if (friendRequest == null)
            {
                return NotFound("Friend request is not valid");
            }
            friendRequest.Status = "Status";
            friendRequest.Date = DateTime.Now;
            try
            {
                int affectedRow = _friendRequestRepository.Add(friendRequest);
                if (affectedRow == 0)
                {
                    return NotFound("Can't send friend request");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return CreatedAtAction("GetFriendRequestsByReceiverId", new { friendRequest.ReceiverId }, friendRequest);
        }
        [HttpPost("AddFriend/{senderId}/{receiverId}")]
        public async Task<IActionResult> AddFriend(int? senderId, int? receiverId)
        {
            if (senderId == null || receiverId == null)
            {
                return BadRequest("SenderId and ReceiverId cannot be null.");
            }
            var accessToken = HttpContext.Request.Headers["Authorization"].FirstOrDefault().Split(" ")[1];
            // Check if friendRequest is existed
            try
            {
                using (var client = new HttpClient())
                {
                    // Include the authorization token in the headers
                    await Console.Out.WriteLineAsync("The current access token is " + accessToken);
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    var getFriendRequestsUrl = $"{BASE_ADDRESS}/api/Users/GetFriendRequestsByReceiverId/{receiverId}";
                    var response = await client.GetAsync(getFriendRequestsUrl);


                    if (!response.IsSuccessStatusCode)
                    {
                        return BadRequest("Friend request list of this user is empty! Aborting operation add friend: " + response.StatusCode);
                    }

                    var responseContent = response.Content.ReadAsStringAsync().Result;
                    var friendRequestList = JsonConvert.DeserializeObject<List<FriendRequest>>(responseContent);

                    bool hasFriendRequest = false;
                    foreach (var friendRequest in friendRequestList)
                    {
                        if ((friendRequest.SenderId == (int)senderId && friendRequest.ReceiverId == (int)receiverId)
                        || (friendRequest.SenderId == (int)receiverId && friendRequest.ReceiverId == (int)senderId))
                        {
                            hasFriendRequest = true;
                        }
                    }
                    if (!hasFriendRequest)
                    {
                        return BadRequest("Friend request does not exist! Aborting operation add friend");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }


            //Add friend
            if (senderId == null || receiverId == null)
            {
                return NotFound();
            }
            Friend friend = new Friend()
            {
                UserId = (int)senderId,
                FriendId = (int)receiverId
            };

            int affectedRow = _friendRepository.Add(friend);
            if (affectedRow == 0)
            {
                return NotFound();
            }

            // After adding the friend, send a request to remove the friend request
            try
            {
                using (var client = new HttpClient())
                {
                    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
                    var removeFriendRequestUrl = $"{BASE_ADDRESS}/api/Users/RemoveFriendRequest/{senderId}/{receiverId}";
                    var response = await client.DeleteAsync(removeFriendRequestUrl);

                    if (response.IsSuccessStatusCode)
                    {
                        return NoContent();
                    }
                    else
                    {
                        return BadRequest("Failed to remove friend request.");
                    }
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("Id mismatch when updating user");
            }
            int affectedRow = _userRepository.Update(user);
            if (affectedRow == 0)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            int affectRow = _userRepository.Delete(id);
            if (affectRow == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("RemoveFriend/{userId}/{friendId}")]
        public async Task<IActionResult> RemoveFriend(int? userId, int? friendId)
        {
            if (userId == null || friendId == null)
            {
                return NotFound();
            }

            int affectedRow = _friendRepository.Delete((int)userId, (int)friendId);
            if (affectedRow == 0)
            {
                return NotFound();
            }
            return NoContent();
        }

        [HttpDelete("RemoveFriendRequest/{senderId}/{receiverId}")]
        public async Task<IActionResult> RemoveFriendRequest(int? senderId, int? receiverId)
        {
            if (senderId == null || receiverId == null)
            {
                return NotFound();
            }
            try
            {
                int affectedRow = _friendRequestRepository.Delete((int)senderId, (int)receiverId);
                if (affectedRow == 0)
                {
                    return NotFound();
                }
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }

    public class UserClaim
    {
        [Required]
        public int UserId;
        [Required]
        public string? Email;
        [Required]
        public string? PhoneNumber;
        [Required]
        public string? Name;
    }

}
