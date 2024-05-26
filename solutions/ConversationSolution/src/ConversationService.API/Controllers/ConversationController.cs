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

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetConversationByIdDTO getConversationByIdDTO)
    {
        if (getConversationByIdDTO == null)
        {
            var conversations = await _sender.Send(new GetAllConversationsQuery());
            return Ok(conversations);

        }

        var conversation = await _sender.Send(new GetConversationQuery
        {
            ConversationId = getConversationByIdDTO.ConversationId
        });
        return Ok(conversation);


    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var conversation = await _sender.Send(new GetConversationQuery
        {
            ConversationId = id
        });
        return Ok(conversation);
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
        var cList = await _sender.Send(query);

        return Ok(cList);
    }
    [HttpGet("member")]
    public async Task<IActionResult> GetMemberListByConversationId([FromQuery] GetMemberListByConversationIdDTO getMemberListByConversationIdDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var query = new GetMemberListByConversationIdQuery
        {
            UserId = Guid.Parse(subjectId!),
            ConversationId = getMemberListByConversationIdDTO.ConversationId
        };
        var cuList = await _sender.Send(query);
        return Ok(cuList);
    }

    [HttpDelete()]
    public async Task<IActionResult> Delete([FromBody] DeleteConversationDTO deleteConversationDTO)
    {
        var command = new DeleteConversationCommand
        {
            ConversationId = deleteConversationDTO.Id
        };
        await _sender.Send(command);
        return NoContent();
    }
}
