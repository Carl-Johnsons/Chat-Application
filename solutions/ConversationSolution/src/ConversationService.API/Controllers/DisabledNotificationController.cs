using ConversationService.Application.Conversations.Commands;
using ConversationService.Application.Conversations.Queries;
using ConversationService.Application.DisabledNotifications.Commands;
using ConversationService.Application.DisabledNotifications.Queries;
using ConversationService.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace ConversationService.API.Controllers;

[Route("/api/notification")]
[ApiController]
[Authorize]
public class DisabledNotificationController : BaseApiController
{
    public DisabledNotificationController(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> CreateDisableNotificaion([FromBody] CreateDisabledNotificationDTO notificationDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var notification = new CreateDisabledNotificationsCommand
        {
            ConversationId = notificationDTO.ConversationId,
            UserId = Guid.Parse(subjectId!)
        };

        var result = await _sender.Send(notification);
        result.ThrowIfFailure();

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteDisabledNotification([FromBody] DeleteDisabledNotificationDTO notificationDTO) 
    {

        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var command = new DeleteDisabledNotificationsCommand
        {
            ConversationId = notificationDTO.ConversationId,
            UserId = Guid.Parse(subjectId!)
        };

        var result = await _sender.Send(command);
        result.ThrowIfFailure();
        return NoContent();
    }

    [HttpGet]
    public async Task<IActionResult> GetDisabledNotificationByUserId()
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var query = new GetDisabledNotificationsByUserIdQuery
        {
            UserId = Guid.Parse(subjectId!)
        };
        var result = await _sender.Send(query);
        result.ThrowIfFailure();

        return Ok(result.Value);
    }
}
