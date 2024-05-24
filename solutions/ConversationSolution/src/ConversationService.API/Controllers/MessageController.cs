﻿using ConversationService.Application.Messages.Commands;
using ConversationService.Application.Messages.Queries;
using ConversationService.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace ConversationService.API.Controllers;

[Route("api/conversation/message")]
[ApiController]
[Authorize]
public partial class MessageController : BaseApiController
{
    public MessageController(ISender sender, IHttpContextAccessor httpContextAccessor)
        : base(sender, httpContextAccessor)
    {
    }
    [HttpGet]
    public async Task<IActionResult> GetByConversationId([FromQuery] GetByConversationIdDTO getByConversationIdDTO)
    {
        if (getByConversationIdDTO.ConversationId == null)
        {
            var messagesList = await _sender.Send(new GetAllMessagesQuery());
            return Ok(messagesList);
        }

        var paginatedMessageList = await _sender.Send(new GetMessagesByConversationIdQuery
        {
            ConversationId = (Guid)getByConversationIdDTO.ConversationId!,
            Skip = getByConversationIdDTO.Skip ?? 0
        });

        return Ok(paginatedMessageList);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var message = await _sender.Send(new GetMessageQuery
        {
            MessageId = id
        });
        return Ok(message);
    }

    [HttpPost]
    public async Task<IActionResult> SendClientMessage([FromBody] SendClientMessageDTO sendClientMessageDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var message = await _sender.Send(new SendClientMessageCommand
        {
            SenderId = Guid.Parse(subjectId!),
            ConversationId = sendClientMessageDTO.ConversationId,
            Content = sendClientMessageDTO.Content
        });
        return Ok(message);
    }
}
