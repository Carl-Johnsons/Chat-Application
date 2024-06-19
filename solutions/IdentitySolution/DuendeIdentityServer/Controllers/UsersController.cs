using AutoMapper;
using Contract.DTOs;
using Contract.Event.UploadEvent;
using Contract.Event.UploadEvent.EventModel;
using Duende.IdentityServer.Extensions;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using MassTransit;
using MassTransit.Clients;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Sprache;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;
using static Duende.IdentityServer.IdentityServerConstants;

namespace DuendeIdentityServer.Controllers;

[Route("api/users")]
[ApiController]
[Authorize(LocalApi.PolicyName)]

public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IBus _bus;

    public UsersController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper, IHttpContextAccessor httpContextAccessor, IBus bus)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _bus = bus;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var senderId = HttpContext.Request.Query["id"].ToString();
        if (senderId != null)
        {

            var user = _context.Users.Where(u => u.Id == senderId).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }
            var mappedUser = _mapper.Map<ApplicationUser, ApplicationUserResponseDTO>(user);
            return Ok(mappedUser);
        }

        var users = _context.Users.ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);
        return Ok(mappedUsers);
    }

    // api/users/search?value=test
    [HttpGet("search")]
    public IActionResult Search()
    {
        string phonePattern = @"^\d{10}$";
        var searchValue = HttpContext.Request.Query["value"].ToString();


        var match = Regex.Match(searchValue, phonePattern);
        IQueryable<ApplicationUser> query = _context.Users;
        var currentUserId = _httpContextAccessor.HttpContext.User.GetSubjectId();

        if (match.Success)
        {
            query = query.Where(u => u.PhoneNumber == searchValue && !_context.UserBlocks.Any(ub => (ub.BlockUserId == u.Id && ub.UserId == currentUserId) || (ub.BlockUserId == currentUserId && ub.UserId == u.Id)));
        }
        else
        {
            query = query.Where(u => u.Name.Contains(searchValue) && !_context.UserBlocks.Any(ub => (ub.BlockUserId == u.Id && ub.UserId == currentUserId) || (ub.BlockUserId == currentUserId && ub.UserId == u.Id)));
        }

        var users = query.ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);
        return Ok(mappedUsers);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromForm] UpdateUserDTO updateUserDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
        var user = await _userManager.FindByIdAsync(subjectId!);

        if (user == null)
        {
            return NotFound("User not found");
        }
        if (updateUserDTO.Name != null) user.Name = (string)updateUserDTO.Name;
        if (updateUserDTO.AvatarFile != null)
        {
            var avtFileStreamEvent = new FileStreamEvent
            {
                FileName = updateUserDTO.AvatarFile.FileName,
                ContentType = updateUserDTO.AvatarFile.ContentType,
                Stream = new BinaryReader(updateUserDTO.AvatarFile.OpenReadStream()).ReadBytes((int)updateUserDTO.AvatarFile.Length)
            };
            var requestClientUpdate = _bus.CreateRequestClient<UpdateFileEvent>();
            var response = await requestClientUpdate.GetResponse<UploadFileEventResponseDTO>(new UpdateFileEvent
            {
                FileStreamEvent = avtFileStreamEvent,
                Url = user.AvatarUrl
            });
            if(response != null)
            {
                user.AvatarUrl = response.Message.Url;
            }
        };
        if (updateUserDTO.BackgroundFile != null) {
            var bgFileStreamEvent = new FileStreamEvent
            {
                FileName = updateUserDTO.BackgroundFile.FileName,
                ContentType = updateUserDTO.BackgroundFile.ContentType,
                Stream = new BinaryReader(updateUserDTO.BackgroundFile.OpenReadStream()).ReadBytes((int)updateUserDTO.BackgroundFile.Length)
            };
            var requestClientUpdate = _bus.CreateRequestClient<UpdateFileEvent>();
            var response = await requestClientUpdate.GetResponse<UploadFileEventResponseDTO>(new UpdateFileEvent
            {
                FileStreamEvent = bgFileStreamEvent,
                Url = user.BackgroundUrl
            });
            if (response != null)
            {
                user.BackgroundUrl = response.Message.Url;
            }
        };
        if (updateUserDTO.Introduction != null) user.Introduction = (string)updateUserDTO.Introduction;
        if (updateUserDTO.Gender != null) user.Gender = (string)updateUserDTO.Gender;
        if (updateUserDTO.Dob != null) user.Dob = (DateTime)updateUserDTO.Dob;

        _context.Users.Update(user);
        _context.SaveChanges();

        return Ok();
    }

    [HttpPost("block")]
    public async Task<IActionResult> Block([FromBody] BlockUserDTO blockUserDTO)
    {
        var buInput = _mapper.Map<BlockUserDTO, UserBlock>(blockUserDTO);
        buInput.UserId = _httpContextAccessor.HttpContext.User.GetSubjectId(); 

        var existingUser = await _context.Users.FindAsync(blockUserDTO.BlockUserId);

        if (existingUser == null)
        {
            return BadRequest("This user does not exit!");
        }

        if (buInput.UserId == buInput.BlockUserId)
        {
            return BadRequest("You can not block yourself!");
        }

        var blockUser = _context.UserBlocks
                            .Where(bu => (bu.UserId == buInput.UserId && bu.BlockUserId == buInput.BlockUserId))
                            .SingleOrDefault();
                            
        if (blockUser != null) 
        {
            return StatusCode(StatusCodes.Status400BadRequest, "You already block this user!");
        }

        var friend = _context.Friends
                             .Where(f => (f.UserId == buInput.UserId && f.FriendId == buInput.BlockUserId) ||
                             (f.FriendId == buInput.BlockUserId && f.UserId == buInput.UserId))
                             .SingleOrDefault();

        _context.UserBlocks.Add(buInput);
        if (friend != null)
        {
            _context.Remove(friend);
        }
        var result = _context.SaveChanges();


        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
        }

        return Ok(); 
    }

    [HttpDelete("unblock")]
    public async Task<IActionResult> Unblock([FromBody] UnblockUserDTO unblockUserDTO)
    {
        var userId = _httpContextAccessor.HttpContext.User.GetSubjectId();
        var blockUserId = unblockUserDTO.UnblockUserId;
        var unblockUser = _context.UserBlocks
                            .Where(ub => (ub.UserId == userId && ub.BlockUserId == blockUserId))                     
                            .SingleOrDefault();

        if (unblockUser == null)
        {
            return BadRequest("They are not in black list");
        }

        _context.UserBlocks.Remove(unblockUser);
        var result = _context.SaveChanges();

        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
        }

        return NoContent();
    }

    [HttpGet("block")]
    public async Task<IActionResult> GetBlockList()
    {
        var userId = _httpContextAccessor.HttpContext.User.GetSubjectId();

        var result = _context.UserBlocks
                        .Where(u =>  u.UserId == userId)
                        .Select(u => u.BlockUserId)
                        .ToList();

        BlockUserListDTO blockUserListDTO = new BlockUserListDTO
        {
            BlockUserId = result
        };   

        return Ok(blockUserListDTO);
    }
}
