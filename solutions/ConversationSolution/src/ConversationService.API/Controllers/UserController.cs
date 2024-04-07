using ConversationService.API.Repositories;
using ConversationService.Core.DTOs;
using ConversationService.Core.Entities;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ConversationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public partial class UserController : ControllerBase
{
    //private static readonly HttpClient _client = new();
    private readonly FriendRepository _friendRepo;
    private readonly FriendRequestRepository _friendRequestRepo;
    private readonly ConversationRepository _conversationRepo;
    private readonly ConversationUsersRepository _conversationUserRepo;
    private UserClaim? CurrentUserClaim => GetCurrentUserClaim();

    //private readonly MapperConfiguration mapperConfig;
    //private readonly Mapper mapper;
    public UserController()
    {
        _friendRepo = new FriendRepository();
        _conversationRepo = new ConversationRepository();
        _conversationUserRepo = new ConversationUsersRepository();
        _friendRequestRepo = new FriendRequestRepository();

        //mapperConfig = new MapperConfiguration(cfg =>
        //{
        //    cfg.CreateMap<Friend, PublicFriendDTO>();
        //    cfg.CreateMap<FriendRequest, PublicFriendRequestDTO>();
        //});
        //mapper = new Mapper(mapperConfig);
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
        };
    }

    //// GET: api/<UsersController>
    //[HttpGet]
    //public IActionResult Get()
    //{
    //    var userList = _userRepository.Get();
    //    var publicUserList = mapper.Map<List<User>, List<PublicUserDTO>>(userList);
    //    return Ok(publicUserList);
    //}

    //// GET api/<UsersController>/5
    //[HttpGet("{id}")]
    //public IActionResult Get(int id)
    //{
    //    var user = _userRepository.Get(id);
    //    var publicUser = mapper.Map<PublicUserDTO>(user);
    //    return Ok(publicUser);
    //}

    //[HttpGet("Search/{phoneNumber}")]
    //public IActionResult Search(string phoneNumber)
    //{
    //    var user = _userRepository.GetByPhoneNumber(phoneNumber);
    //    var publicUser = mapper.Map<PublicUserDTO>(user);
    //    return Ok(publicUser);
    //}


    //// POST api/<UsersController>
    //[HttpPost]
    //public IActionResult Add([FromBody] User user)
    //{
    //    _userRepository.Add(user);
    //    return CreatedAtAction("Get", new { id = user.UserId }, user);
    //}



    //// PUT api/<UsersController>/5
    //[HttpPut("{id}")]
    //public IActionResult Put(int id, [FromBody] PublicUserDTO publicUser)
    //{
    //    if (id != publicUser.UserId)
    //    {
    //        return BadRequest("Id mismatch when updating user");
    //    }
    //    var oldUser = _userRepository.Get(id);
    //    if (oldUser == null)
    //    {
    //        return NotFound("User not found!");
    //    }
    //    var user = new User()
    //    {
    //        UserId = publicUser.UserId,
    //        Active = publicUser.Active,
    //        AvatarUrl = publicUser.AvatarUrl,
    //        BackgroundUrl = publicUser.BackgroundUrl,
    //        Dob = publicUser.Dob,
    //        Gender = publicUser.Gender,
    //        Introduction = publicUser.Introduction,
    //        Name = publicUser.Name,
    //        PhoneNumber = publicUser.PhoneNumber,

    //        Password = oldUser.Password,
    //        Email = oldUser.Email,
    //        RefreshTokenCreated = oldUser.RefreshTokenCreated,
    //        RefreshToken = oldUser.RefreshToken,
    //        RefreshTokenExpired = oldUser.RefreshTokenExpired
    //    };

    //    _userRepository.Update(user);

    //    return Ok(publicUser);
    //}

    //// DELETE api/<UsersController>/5
    //[HttpDelete("{id}")]
    //public IActionResult Delete(int id)
    //{
    //    _userRepository.Delete(id);
    //    return NoContent();
    //}

    [HttpGet("Friend")]
    public IActionResult GetFriend()
    {
        if (CurrentUserClaim == null)
        {
            return Unauthorized();
        }
        var fList = _friendRepo.GetByUserId(CurrentUserClaim.UserId);
        return Ok(fList);
    }

    [HttpPost("Friend/{receiverId}")]
    public async Task<IActionResult> AddFriend(int? receiverId)
    {
        if (CurrentUserClaim == null)
        {
            return Unauthorized();
        }
        if (receiverId == null)
        {
            return BadRequest("ReceiverId cannot be null!");
        }


        try
        {
            // Check if friendRequest is existed
            var senderId = CurrentUserClaim.UserId;
            var frList = _friendRequestRepo.GetByReceiverId((int)receiverId);
            bool hasFriendRequest = false;
            foreach (var friendRequest in frList)
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

            Friend friend = new()
            {
                UserId = senderId,
                FriendId = (int)receiverId
            };

            int affectedRow = _friendRepo.Add(friend);
            if (affectedRow == 0)
            {
                return NotFound();
            }

            // After adding the friend, send a request to remove the friend request
            _friendRequestRepo.Delete(senderId, (int)receiverId);
            //Check if existed conversation
            var cu = _conversationUserRepo.GetIndividualConversation((int)senderId, (int)receiverId);
            if (cu != null)
            {
                return StatusCode(StatusCodes.Status201Created, "2 users already have an existed conversation. Aborting creating a new one");
            }
            var conversation = _conversationRepo.AddConversationWithMemberId(new ConversationWithMembersId()
            {
                Type = "Individual",
                MembersId = new List<int>() {
                        senderId,(int)receiverId
                    }
            });

            return StatusCode(StatusCodes.Status201Created, conversation);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("Friend/{friendId}")]
    public IActionResult RemoveFriend(int friendId)
    {
        if (CurrentUserClaim == null)
        {
            return Unauthorized();
        }
        _friendRepo.Delete(CurrentUserClaim.UserId, friendId);
        return NoContent();
    }
    [HttpGet("FriendRequests/Receiver/{receiverId}")]
    public IActionResult GetFriendRequestsByReceiverId(int receiverId)
    {
        var frList = _friendRequestRepo.GetByReceiverId(receiverId);
        return Ok(frList);
    }

    [HttpGet("FriendRequests/Sender/{senderId}")]
    public IActionResult GetFriendRequestsBySenderId(int senderId)
    {
        var frList = _friendRequestRepo.GetBySenderId(senderId);
        return Ok(frList);
    }
    [HttpPost("FriendRequest")]
    public IActionResult SendFriendRequest([FromBody] FriendRequest friendRequest)
    {
        friendRequest.Status = "Status";
        friendRequest.Date = DateTime.Now;
        try
        {
            int affectedRow = _friendRequestRepo.Add(friendRequest);
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
    [HttpDelete("FriendRequest/{senderId}")]
    public IActionResult RemoveFriendRequest(int senderId)
    {
        if (CurrentUserClaim == null)
        {
            return Unauthorized();
        }
        _friendRequestRepo.Delete(senderId, CurrentUserClaim.UserId);
        return NoContent();
    }
}
