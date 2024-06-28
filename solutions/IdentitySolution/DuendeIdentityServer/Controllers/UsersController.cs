using AutoMapper;
using Contract.DTOs;
using Contract.Event.UploadEvent;
using Contract.Event.UploadEvent.EventModel;
using Contract.Event.UserEvent;
using Duende.IdentityServer.Extensions;
using DuendeIdentityServer.Constants;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using DuendeIdentityServer.Services;
using MassTransit;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
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
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly IPaginateDataUtility<ApplicationUser, EmptyMetadata> _paginateDataUtility;
    private readonly ISignalRService _signalRService;

    public UsersController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper, IHttpContextAccessor httpContextAccessor, IBus bus, IPublishEndpoint publishEndpoint, IPaginateDataUtility<ApplicationUser, EmptyMetadata> paginateDataUtility, ISignalRService signalRService)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
        _httpContextAccessor = httpContextAccessor;
        _bus = bus;
        _publishEndpoint = publishEndpoint;
        _paginateDataUtility = paginateDataUtility;
        _signalRService = signalRService;
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("all")]
    public IActionResult GetAll([FromQuery] PaginatedUserListDTO dto)
    {
        var usersQuery = _context.Users.AsQueryable();

        var limit = dto.Limit ?? PAGINATED_CONSTANTS.USER_LIMIT;

        var count = usersQuery.Count();
        var totalPage = (count / limit) + (count % limit == 0 ? 0 : 1);

        usersQuery = _paginateDataUtility.PaginateQuery(usersQuery, new PaginateParam
        {
            Offset = dto.Skip * limit,
            Limit = limit
        });

        var users = usersQuery.ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);

        var paginatedResponse = new PaginatedUserListResponseDTO
        {
            PaginatedData = mappedUsers,
            Metadata = new CommonPaginatedMetadata
            {
                TotalPage = totalPage
            }
        };
        return Ok(paginatedResponse);
    }

    [HttpGet]
    public IActionResult Get([FromQuery] Guid id)
    {
        var user = _context.Users.Where(u => u.Id == id.ToString()).FirstOrDefault();
        if (user == null)
        {
            return NotFound();
        }
        var mappedUser = _mapper.Map<ApplicationUser, ApplicationUserResponseDTO>(user);
        return Ok(mappedUser);
    }


    // api/users/search?value=test
    [HttpGet("search")]
    public IActionResult Search([FromQuery] PaginatedUserListDTO dto)
    {
        string phonePattern = @"^\d{10}$";
        var searchValue = HttpContext.Request.Query["value"].ToString();


        var match = Regex.Match(searchValue, phonePattern);
        IQueryable<ApplicationUser> query = _context.Users;
        var currentUserId = _httpContextAccessor.HttpContext!.User.GetSubjectId();

        if (match.Success)
        {
            query = query.Where(u => u.PhoneNumber == searchValue && !_context.UserBlocks.Any(ub => (ub.BlockUserId == u.Id && ub.UserId == currentUserId) || (ub.BlockUserId == currentUserId && ub.UserId == u.Id)));
        }
        else
        {
            query = query.Where(u => u.Name.Contains(searchValue) && !_context.UserBlocks.Any(ub => (ub.BlockUserId == u.Id && ub.UserId == currentUserId) || (ub.BlockUserId == currentUserId && ub.UserId == u.Id)));
        }

        var limit = dto.Limit ?? PAGINATED_CONSTANTS.USER_LIMIT;
        var count = query.Count();
        var totalPage = (count / limit) + (count % limit == 0 ? 0 : 1);

        query = _paginateDataUtility.PaginateQuery(query, new PaginateParam
        {
            Offset = dto.Skip * limit,
            Limit = limit
        });

        var users = query.ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);

        var response = new PaginatedUserListResponseDTO
        {
            PaginatedData = mappedUsers,
            Metadata = new CommonPaginatedMetadata
            {
                TotalPage = totalPage
            }
        };

        return Ok(response);
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
            if (response != null)
            {
                user.AvatarUrl = response.Message.Url;
            }
        };
        if (updateUserDTO.BackgroundFile != null)
        {
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
        buInput.UserId = _httpContextAccessor.HttpContext?.User.GetSubjectId() ?? "";

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

        _context.UserBlocks.Add(buInput);

        var friend = _context.Friends
                             .Where(f => (f.UserId == buInput.UserId && f.FriendId == buInput.BlockUserId) ||
                             (f.FriendId == buInput.UserId && f.UserId == buInput.BlockUserId))
                             .SingleOrDefault();

        if (friend != null)
        {
            _context.Friends.Remove(friend);
        }

        var friendReq = _context.FriendRequests
                                .Where(fq => (fq.SenderId == buInput.BlockUserId && fq.ReceiverId == buInput.UserId) ||
                                (fq.SenderId == buInput.UserId && fq.ReceiverId == buInput.BlockUserId))
                                .SingleOrDefault();

        if (friendReq != null)
        {
            _context.FriendRequests.Remove(friendReq);
        }
        var result = _context.SaveChanges();

        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
        }

        await _publishEndpoint.Publish(
                new UserBlockedEvent
                {
                    UserId = Guid.Parse(buInput.UserId),
                    BlockUserId = Guid.Parse(buInput.BlockUserId),
                }
            );

        return Ok();
    }

    [HttpDelete("unblock")]
    public IActionResult Unblock([FromBody] UnblockUserDTO unblockUserDTO)
    {
        var userId = _httpContextAccessor.HttpContext?.User.GetSubjectId();
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
    public IActionResult GetBlockList()
    {
        var userId = _httpContextAccessor.HttpContext?.User.GetSubjectId();

        var result = _context.UserBlocks
                        .Where(u => u.UserId == userId)
                        .Select(u => u.BlockUserId)
                        .ToList();

        BlockUserListDTO blockUserListDTO = new BlockUserListDTO
        {
            BlockUserId = result
        };

        return Ok(blockUserListDTO);
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("disable")]
    public async Task<IActionResult> DisableUser([FromBody] DisableAndEnableUserDTO dto)
    {
        var user = await _userManager.FindByIdAsync(dto.Id.ToString());
        if (user == null)
        {
            return NotFound();
        }
        user.Active = false;
        _context.Users.Update(user);
        _context.SaveChanges();
        await _signalRService.InvokeAction("DisableUser", dto);
        return Ok();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("enable")]
    public async Task<IActionResult> EnableUser([FromBody] DisableAndEnableUserDTO dto)
    {
        var user = await _userManager.FindByIdAsync(dto.Id.ToString());
        if (user == null)
        {
            return NotFound();
        }
        user.Active = true;
        _context.Users.Update(user);
        _context.SaveChanges();
        return Ok();
    }
}
