using ConversationService.Application.Conversations.Commands;
using ConversationService.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ConversationService.API.Controllers;

[Route("api/conversation/group")]
[ApiController]
[Authorize]
public partial class GroupConversationController : BaseApiController
{
    public GroupConversationController(
            ISender sender,
            IHttpContextAccessor httpContextAccessor
        ) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> CreateGroupConversation([FromForm] CreateGroupConversationDTO createGroupConversationDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
        var result = await _sender.Send(
                new CreateGroupConversationCommand
                {
                    CurrentUserID = Guid.Parse(subjectId!),
                    CreateGroupConversationDTO = createGroupConversationDTO
                });

        result.ThrowIfFailure();
        return StatusCode(StatusCodes.Status201Created);
    }
}
