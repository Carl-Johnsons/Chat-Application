﻿using AutoMapper;
using Duende.IdentityServer.Extensions;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using static Duende.IdentityServer.IdentityServerConstants;

namespace DuendeIdentityServer.Controllers;

[Route("api/users/friend-request")]
[ApiController]
[Authorize(LocalApi.PolicyName)]
public class FriendRequestController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IMapper _mapper;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public FriendRequestController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IHttpContextAccessor httpContextAccessor, IMapper mapper)
    {
        _context = context;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var userId = _httpContextAccessor.HttpContext?.User.Identity.GetSubjectId();

        //Current user only see friend request if they are receiver
        var frList = _context.FriendRequests
                        .Where(fr => fr.ReceiverId == userId)
                        .Include(fr => fr.Sender)
                        .ToList();

        var mappedTransformList = _mapper.Map<List<FriendRequest>, List<FriendRequestResponseDTO>>(frList);
        return Ok(mappedTransformList);
    }


    [HttpPost]
    public async Task<IActionResult> Post([FromBody] SendFriendRequestDTO sendFriendRequestDTO)
    {
        var frInput = _mapper.Map<SendFriendRequestDTO, FriendRequest>(sendFriendRequestDTO);
        frInput.SenderId = _httpContextAccessor.HttpContext.User.GetSubjectId();

        var friend = _context.Friends
                              .Where(f => (f.UserId == frInput.SenderId && f.FriendId == frInput.ReceiverId) ||
                                    (f.FriendId == frInput.SenderId && f.UserId == frInput.ReceiverId))
                              .SingleOrDefault();

        // If they are already friend cancel the friend request
        if (friend != null)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "They are already friend, cancel sending friend request");
        }

        var friendRequest = _context.FriendRequests
                                     .Where(fr => (fr.SenderId == frInput.SenderId && fr.ReceiverId == frInput.ReceiverId))
                                     .SingleOrDefault();

        if (friendRequest != null)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "You already send the friend request, wait for them to accept");
        }
         friendRequest = _context.FriendRequests
                             .Where(fr => (fr.ReceiverId == frInput.SenderId && fr.SenderId == frInput.ReceiverId))
                             .SingleOrDefault();
        if (friendRequest != null)
        {
            return StatusCode(StatusCodes.Status400BadRequest, "You already have their pending friend request. Please accept the current friend request");
        }

        frInput.CreatedAt = DateTime.UtcNow;
        frInput.Status = "Pending";

        _context.FriendRequests.Add(frInput);
        int result = _context.SaveChanges();

        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
        }

        return Ok();
    }

    [HttpPost("accept")]
    public async Task<IActionResult> AcceptFriendRequest([FromBody] AcceptFriendRequestDTO accecptFriendRequestDTO)
    {
        var fr = _context.FriendRequests
                            .Where(fr => fr.Id.ToString() == accecptFriendRequestDTO.FriendRequestId)
                            .FirstOrDefault();
        if (fr == null)
        {
            return NotFound();
        }

        var friend = new Friend
        {
            UserId = fr.SenderId,
            FriendId = fr.ReceiverId,
        };

        _context.Friends.Add(friend);
        _context.FriendRequests.Remove(fr);

        var result = _context.SaveChanges();
        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "accept friend request fail");
        }

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] DeleteFriendRequestDTO deleteFriendRequestDTO)
    {
        var fr = _context.FriendRequests
                            .Where(fr => fr.Id.ToString() == deleteFriendRequestDTO.FriendRequestId)
                            .FirstOrDefault();
        if (fr == null)
        {
            return NotFound();
        }
        _context.FriendRequests.Remove(fr);
        var result = _context.SaveChanges();
        if (result == 0)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Update failed");
        }

        return NoContent();
    }
}
