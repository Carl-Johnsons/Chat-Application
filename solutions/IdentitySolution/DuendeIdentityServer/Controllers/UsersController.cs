using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DuendeIdentityServer.Controllers;

[Route("api/users")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;

    public UsersController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var users = _context.Users.ToList();
        return Ok(users);
    }

    [HttpPut]
    [Authorize]
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
