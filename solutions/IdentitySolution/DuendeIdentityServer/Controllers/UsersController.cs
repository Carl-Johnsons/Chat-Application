using AutoMapper;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using Sprache;
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

    public UsersController(ApplicationDbContext context, UserManager<ApplicationUser> userManager, IMapper mapper)
    {
        _context = context;
        _userManager = userManager;
        _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
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
    [AllowAnonymous]
    public IActionResult Search()
    {
        string phonePattern = @"^\d{10}$";
        var searchValue = HttpContext.Request.Query["value"].ToString();


        var match = Regex.Match(searchValue, phonePattern);
        IQueryable<ApplicationUser> query = _context.Users;

        if (match.Success)
        {
            query = query.Where(u => u.PhoneNumber == searchValue);
        }
        else
        {
            query = query.Where(u => u.Name.Contains(searchValue));
        }

        var users = query.ToList();
        var mappedUsers = _mapper.Map<List<ApplicationUser>, List<ApplicationUserResponseDTO>>(users);
        return Ok(mappedUsers);
    }

    [HttpPut]
    public async Task<IActionResult> Put([FromBody] UpdateUserDTO updateUserDTO)
    {
        var user = await _userManager.FindByIdAsync(updateUserDTO.Sub);

        if (user == null)
        {
            return NotFound("User not found");
        }
        if (updateUserDTO.Name != null) user.Name = (string)updateUserDTO.Name;
        if (updateUserDTO.AvatarUrl != null) user.AvatarUrl = (string)updateUserDTO.AvatarUrl;
        if (updateUserDTO.BackgroundUrl != null) user.BackgroundUrl = (string)updateUserDTO.BackgroundUrl;
        if (updateUserDTO.Introduction != null) user.Introduction = (string)updateUserDTO.Introduction;
        if (updateUserDTO.Gender != null) user.Gender = (string)updateUserDTO.Gender;
        if (updateUserDTO.Dob != null) user.Dob = (DateTime)updateUserDTO.Dob;

        _context.Users.Update(user);
        _context.SaveChanges();

        return Ok();
    }


}
