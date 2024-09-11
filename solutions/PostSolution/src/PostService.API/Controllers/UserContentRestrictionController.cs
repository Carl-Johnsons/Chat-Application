using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostService.Application.Posts.Commands;
using PostService.Domain.DTOs;
using System.IdentityModel.Tokens.Jwt;

namespace PostService.API.Controllers;

[Route("api/content-restriction")]
[ApiController]
[Authorize]
public class UserContentRestrictionController : BaseApiController
{
    public UserContentRestrictionController(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> CreateContentRestriction(CreateContentRestrictionDTO contentRestrictionDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var content = await _sender.Send( new CreateUserContentRestrictionsCommand
        {
            UserId = contentRestrictionDTO.UserId,
            TypeId = contentRestrictionDTO.TypeId,
            ExpiredAt = contentRestrictionDTO.ExpiredAt
        });

        content.ThrowIfFailure();

        return Ok();
    }
}
