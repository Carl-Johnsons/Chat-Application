using ConversationService.Application.Conversations.Commands;
using ConversationService.Application.Conversations.Queries;
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

    [HttpPut]
    public async Task<IActionResult> UpdateGroupConversation([FromForm] UpdateGroupConversationDTO dto)
    {
        var result = await _sender.Send(
                new UpdateGroupConversationCommand
                {
                    UpdateGroupConversationDTO = dto
                });

        result.ThrowIfFailure();
        return StatusCode(StatusCodes.Status204NoContent);
    }

    [HttpGet("invite")]
    public async Task<IActionResult> GetInviteUrlByGroupId([FromQuery] Guid id)
    {
        var result = await _sender.Send(
            new GetGroupInviteUrlQuery
            {
                Id = id
            });
        result.ThrowIfFailure();
        return Ok(result.Value);
    }

    [HttpGet("invite/detail")]
    public async Task<IActionResult> GetGroupInvitationByInviteId([FromQuery] Guid id)
    {
        var result = await _sender.Send(
            new GetGroupInvitationByInviteIdCommand
            {
                InviteId = id
            });
        result.ThrowIfFailure();
        return Ok(result.Value);
    }

    [HttpPost("invite")]
    public async Task<IActionResult> GenerateInviteUrl([FromBody] CreateGroupInviteUrlDTO dto)
    {
        var result = await _sender.Send(
            new CreateGroupInviteUrlCommand
            {
                GroupId = dto.GroupId
            });
        result.ThrowIfFailure();
        return StatusCode(StatusCodes.Status201Created, result.Value);
    }

    [HttpPost("join")]
    public async Task<IActionResult> JoinGroupConversation([FromBody] JoinGroupConversationDTO dto)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;
        var result = await _sender.Send(
            new JoinGroupConversationCommand
            {
                JoinConversationDTO = dto,
                UserId = Guid.Parse(subjectId!)
            });
        result.ThrowIfFailure();

        return StatusCode(StatusCodes.Status201Created);
    }
}
