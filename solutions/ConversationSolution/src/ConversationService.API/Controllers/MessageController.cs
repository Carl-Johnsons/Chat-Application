using ConversationService.Application.Messages.Commands.SendClientMessage;
using ConversationService.Application.Messages.Queries.GetAllMessages;
using ConversationService.Application.Messages.Queries.GetLastMessage;
using ConversationService.Application.Messages.Queries.GetMessage;
using ConversationService.Application.Messages.Queries.GetMessagesByConversationId;
using ConversationService.Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ConversationService.API.Controllers;

[Route("api/message")]
[ApiController]
[Authorize]
public partial class MessageController : ApiControllerBase
{
    public MessageController(ISender sender, IHttpContextAccessor httpContextAccessor)
        : base(sender, httpContextAccessor)
    {
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var messages = await _sender.Send(new GetAllMessagesQuery());
        return Ok(messages);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var message = await _sender.Send(new GetMessageQuery(id));
        return Ok(message);
    }
    //GET api/Messages/Conversation/1?skip=1
    [HttpGet("Conversation/{id}")]
    public async Task<IActionResult> GetByConversationId(Guid id, int? skip)
    {
        if (skip == null)
        {
            skip = 0;
        }
        var messages = await _sender.Send(new GetMessagesByConversationIdQuery(id, (int)skip));
        return Ok(messages);
    }
    [HttpGet("Conversation/{conversationId}/last")]
    public async Task<IActionResult> GetLast(Guid conversationId)
    {
        var m = await _sender.Send(new GetLastMessageQuery(conversationId));
        return Ok(m);
    }
    [HttpPost]
    public async Task<IActionResult> SendClientMessage([FromBody] Message message)
    {
        await _sender.Send(new SendClientMessageCommand(message));
        return CreatedAtAction(nameof(Get), new
        {
            id = message.Id
        }, message);
    }
}
