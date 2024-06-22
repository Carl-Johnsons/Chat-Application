using ConversationService.Application.Conversations.Commands;
using ConversationService.Application.Conversations.Queries;
using ConversationService.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ConversationService.API.Controllers;

[Route("api/conversation")]
[ApiController]
[Authorize]
public partial class ConversationController : BaseApiController
{
    public ConversationController(
            ISender sender,
            IHttpContextAccessor httpContextAccessor
        ) : base(sender, httpContextAccessor)
    {
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var result = await _sender.Send(new GetAllConversationsQuery());
        result.ThrowIfFailure();
        return Ok(result.Value);
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] GetConversationByIdDTO getConversationByIdDTO)
    {
        var result = await _sender.Send(new GetConversationByIdQuery
        {
            ConversationId = getConversationByIdDTO.ConversationId
        });
        result.ThrowIfFailure();
        return Ok(result.Value);
    }
    [HttpGet("user")]
    public async Task<IActionResult> GetConversationListByUserId()
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var query = new GetConversationListByUserIdQuery
        {
            UserId = Guid.Parse(subjectId!)
        };
        var result = await _sender.Send(query);
        result.ThrowIfFailure();

        return Ok(result.Value);
    }
    [HttpGet("member")]
    public async Task<IActionResult> GetMemberListByConversationId([FromQuery] GetMemberListByConversationIdDTO getMemberListByConversationIdDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var query = new GetMemberListByConversationIdQuery
        {
            UserId = Guid.Parse(subjectId!),
            ConversationId = getMemberListByConversationIdDTO.ConversationId,
            Other = getMemberListByConversationIdDTO.Other
        };
        var result = await _sender.Send(query);
        result.ThrowIfFailure();
        return Ok(result.Value);
    }

    [HttpDelete()]
    public async Task<IActionResult> Delete([FromBody] DeleteConversationDTO deleteConversationDTO)
    {
        var command = new DeleteConversationCommand
        {
            ConversationId = deleteConversationDTO.Id
        };
        var result = await _sender.Send(command);
        result.ThrowIfFailure();
        return NoContent();
    }
}
