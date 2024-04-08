using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

using MediatR;
using AuthService.Core.Entities;
using Microsoft.AspNetCore.Authorization;
using AuthService.API.Utils;
using AuthService.Core.DTOs;

namespace AuthService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IMediator _mediator;

    public AuthController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet("Refresh")]
    public async Task<IActionResult> Refresh()
    {
        var refreshToken = Request.Cookies[TokenUtil.RefreshTokenCookieName];
        if (refreshToken == null)
        {
            return Forbid();
        }
        var command = new RefreshCommand(refreshToken);
        var accessToken = await _mediator.Send(command);

        return Ok(new TokenModel
        {
            AccessToken = accessToken
        });
    }

    [Authorize]
    [HttpGet("Me")]
    public async Task<IActionResult> Me()
    {
        var CurrentUserClaim = GetCurrentUserClaim();
        var query = new GetCurrentUserQuery(CurrentUserClaim);
        var user = await _mediator.Send(query);
        return Ok(user);
    }
    // POST api/login
    [HttpPost("Login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
    {
        var command = new LoginCommand(loginDTO);
        var tokenResponse = await _mediator.Send(command);

        if (tokenResponse.AccessToken == null)
        {
            return BadRequest("Secret key or issuer or audience is undefined");
        }
        // Add refresh token to httpOnly Cookie
        if (tokenResponse.RefreshToken != null)
        {
            Response.Cookies.Append(TokenUtil.RefreshTokenCookieName, tokenResponse.RefreshToken, new CookieOptions
            {
                Expires = tokenResponse.RefreshTokenExpiredAt ?? DateTime.Now,
                // This attribute allow to use cookie at server-side, not client-side,
                // which help prevent Cross-Site Scripting (XSS) attacks
                HttpOnly = true,
                // Enable HTTPS
                Secure = true,
                // Allow cookie to be sent with request.
                // However, this would be exposed to cross-site request forgery (CSRF) attacks 
                SameSite = SameSiteMode.None
            });
        }

        var token = new TokenModel
        {
            AccessToken = tokenResponse.AccessToken
        };


        return Ok(token);
    }
    // POST api/login
    [HttpPost("Register")]
    public async Task<IActionResult> Register([FromBody] User user)
    {
        var command = new RegisterCommand(user);
        await _mediator.Send(command);
        return Created();
    }

    [HttpPost("Logout")]
    public ActionResult Logout()
    {
        Response.Cookies.Append(TokenUtil.RefreshTokenCookieName, "", new CookieOptions
        {
            Expires = DateTime.Now.AddDays(-1),
            HttpOnly = true,
            Secure = true,
            SameSite = SameSiteMode.None
        });

        return NoContent();
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
            Name = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.GivenName)?.Value,
        };
    }
}
