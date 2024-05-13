using AutoMapper;
using Duende.IdentityServer.Extensions;
using DuendeIdentityServer.Data;
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
    public async Task<IActionResult> Get()
    {
        var userId = _httpContextAccessor.HttpContext.User.GetSubjectId();
        var friendIdList = _context.Friends
                                .Where(f => f.UserId == userId || f.FriendId == userId)
                                .Select(f => f.UserId == userId ? f.FriendId : f.UserId)
                                .ToList();

        return Ok(friendIdList);
    }
}
