using ConversationService.Application.Users.Commands.AddFriend;
using ConversationService.Application.Users.Commands.DeleteFriend;
using ConversationService.Application.Users.Commands.DeleteFriendRequest;
using ConversationService.Application.Users.Commands.SendFriendRequest;
using ConversationService.Application.Users.Queries.GetFriendRequestBySenderId;
using ConversationService.Application.Users.Queries.GetFriendRequestsByReceiverId;
using ConversationService.Application.Users.Queries.GetFriends;
using ConversationService.Domain.DTOs;
using ConversationService.Domain.Entities;
using MediatR;

using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ConversationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public partial class UserController : ApiControllerBase
{
    //private static readonly HttpClient _client = new();
    private UserClaim? CurrentUserClaim => GetCurrentUserClaim();

    //private readonly MapperConfiguration mapperConfig;
    //private readonly Mapper mapper;
    public UserController(ISender sender) : base(sender)
    {

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
        var query = new GetFriendsQuery(CurrentUserClaim.UserId);
        var fList = _sender.Send(query);
        return Ok(fList);
    }

    [HttpPost("Friend/{receiverId}")]
    public async Task<IActionResult> AddFriend(int? receiverId)
    {
        var command = new AddFriendCommand(CurrentUserClaim, receiverId);
        var conversation = await _sender.Send(command);
        return StatusCode(StatusCodes.Status201Created, conversation);
    }

    [HttpDelete("Friend/{friendId}")]
    public async Task<IActionResult> RemoveFriend(int friendId)
    {
        var command = new DeleteFriendCommand(CurrentUserClaim, friendId);
        await _sender.Send(command);
        return NoContent();
    }
    [HttpGet("FriendRequests/Receiver/{receiverId}")]
    public async Task<IActionResult> GetFriendRequestsByReceiverId(int receiverId)
    {
        var query = new GetFriendRequestsByReceiverIdQuery(receiverId);
        var frList = await _sender.Send(query);
        return Ok(frList);
    }

    [HttpGet("FriendRequests/Sender/{senderId}")]
    public async Task<IActionResult> GetFriendRequestsBySenderId(int senderId)
    {
        var query = new GetFriendRequestsBySenderIdQuery(senderId);
        var frList = await _sender.Send(query);
        return Ok(frList);
    }
    [HttpPost("FriendRequest")]
    public async Task<IActionResult> SendFriendRequest([FromBody] FriendRequest friendRequest)
    {
        var command = new SendFriendRequestCommand(friendRequest);
        await _sender.Send(command);
        return CreatedAtAction("GetFriendRequestsByReceiverId", new { friendRequest.ReceiverId }, friendRequest);
    }
    [HttpDelete("FriendRequest/{senderId}")]
    public async Task<IActionResult> DeleteFriendRequest(int senderId)
    {
        var command = new DeleteFriendRequestCommand(senderId, CurrentUserClaim);
        await _sender.Send(command);
        return NoContent();
    }
}
