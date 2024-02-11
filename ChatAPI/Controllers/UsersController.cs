using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using DataAccess.Repositories.Interfaces;
using AutoMapper;
using BussinessObject.DTO;

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
        private UserClaim? CurrentUserClaim => GetCurrentUserClaim();

        private readonly MapperConfiguration mapperConfig;
        private readonly Mapper mapper;
        public UsersController()
        {
            _userRepository = new UserRepository();
            _friendRepository = new FriendRepository();
            _friendRequestRepository = new FriendRequestRepository();

            mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, PublicUserDTO>();
                cfg.CreateMap<Friend, PublicFriendDTO>();
                cfg.CreateMap<FriendRequest, PublicFriendRequestDTO>();
            });
            mapper = new Mapper(mapperConfig);
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
        public IActionResult Get()
        {
            var userList = _userRepository.Get();
            var publicUserList = mapper.Map<List<User>, List<PublicUserDTO>>(userList);
            return Ok(publicUserList);
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var user = _userRepository.Get(id);
            var publicUser = mapper.Map<PublicUserDTO>(user);
            return Ok(publicUser);
        }
        [HttpGet("GetUserProfile")]
        public IActionResult GetUserProfile()
        {
            if (CurrentUserClaim == null)
            {
                return Unauthorized("User didn't log in");
            }
            var user = _userRepository.Get(CurrentUserClaim.UserId);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet("GetFriend/{userId}")]
        public IActionResult GetFriend(int userId)
        {
            var fList = _friendRepository.GetByUserId(userId);
            var publicFList = mapper.Map<List<Friend>, List<PublicFriendDTO>>(fList);
            return Ok(publicFList);
        }
        [HttpGet("Search/{phoneNumber}")]
        public IActionResult Search(string phoneNumber)
        {
            var user = _userRepository.GetByPhoneNumber(phoneNumber);
            var publicUser = mapper.Map<PublicUserDTO>(user);
            return Ok(publicUser);
        }
        [HttpGet("GetFriendRequestsByReceiverId/{receiverId}")]
        public IActionResult GetFriendRequestsByReceiverId(int receiverId)
        {
            var frList = _friendRequestRepository.GetByReceiverId(receiverId);
            var publicFrList = mapper.Map<List<FriendRequest>, List<PublicFriendRequestDTO>>(frList);
            return Ok(publicFrList);
        }

        [HttpGet("GetFriendRequestsBySenderId/{senderId}")]
        public IActionResult GetFriendRequestsBySenderId(int senderId)
        {
            var frList = _friendRequestRepository.GetBySenderId(senderId);
            var publicFrList = mapper.Map<List<FriendRequest>, List<PublicFriendRequestDTO>>(frList);
            return Ok(publicFrList);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Add([FromBody] User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.UserId }, user);
        }

        [HttpPost("SendFriendRequest")]
        public IActionResult SendFriendRequest([FromBody] FriendRequest friendRequest)
        {
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
            var publicFr = mapper.Map<PublicFriendRequestDTO>(friendRequest);
            return CreatedAtAction("GetFriendRequestsByReceiverId", new { publicFr.ReceiverId }, publicFr);
        }
        [HttpPost("AddFriend/{senderId}/{receiverId}")]
        public async Task<IActionResult> AddFriend(int? senderId, int? receiverId)
        {
            if (senderId == null || receiverId == null)
            {
                return BadRequest("SenderId and ReceiverId cannot be null.");
            }
            var accessToken = HttpContext?.Request?.Headers?["Authorization"].FirstOrDefault().Split(" ")[1];
            // Check if friendRequest is existed
            try
            {
                using (var client = new HttpClient())
                {
                    // Include the authorization token in the headers
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
        public IActionResult Put(int id, [FromBody] User user)
        {
            if (id != user.UserId)
            {
                return BadRequest("Id mismatch when updating user");
            }
            _userRepository.Update(user);
            var publicUser = mapper.Map<PublicUserDTO>(user);
            return Ok(publicUser);
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _userRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("RemoveFriend/{userId}/{friendId}")]
        public IActionResult RemoveFriend(int userId, int friendId)
        {
            _friendRepository.Delete(userId, friendId);
            return NoContent();
        }

        [HttpDelete("RemoveFriendRequest/{senderId}/{receiverId}")]
        public IActionResult RemoveFriendRequest(int senderId, int receiverId)
        {
            _friendRequestRepository.Delete(senderId, receiverId);
            return NoContent();
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
