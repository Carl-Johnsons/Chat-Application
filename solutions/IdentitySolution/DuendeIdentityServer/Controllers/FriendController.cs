using AutoMapper;
using Duende.IdentityServer.Extensions;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using static Duende.IdentityServer.IdentityServerConstants;

namespace DuendeIdentityServer.Controllers;

[Route("api/friend")]
[Authorize(LocalApi.PolicyName)]
[ApiController]
public class FriendController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public FriendController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor, IMapper mapper)
    {
        _context = context;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var userId = _httpContextAccessor.HttpContext?.User.GetSubjectId();
        var friendIdList = _context.Friends
                                .Where(f => f.UserId == userId || f.FriendId == userId)
                                .Select(f => f.UserId == userId ? f.FriendId : f.UserId)
                                .ToList();
        var users = _context.Users
                               .Where(u => friendIdList.Contains(u.Id))
                               .ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);
        return Ok(mappedUsers);
    }

    [HttpDelete]
    public IActionResult Delete([FromBody] DeleteFriendDTO deleteFriendDTO)
    {
        var userId = _httpContextAccessor.HttpContext?.User.GetSubjectId();
        var friendId = deleteFriendDTO.FriendId;
        var friend = _context.Friends
                             .Where(f => (f.UserId == userId && f.FriendId == friendId) ||
                             (f.FriendId == userId && f.UserId == friendId))
                             .SingleOrDefault();
        if (friend == null)
        {
            return BadRequest("They already not friend");
        }
        _context.Friends.Remove(friend);
        var result = _context.SaveChanges();
        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Remove friend failed");
        }

        return NoContent();
    }
}
