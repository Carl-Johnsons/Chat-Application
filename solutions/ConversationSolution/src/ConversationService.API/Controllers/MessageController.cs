using ConversationService.Core.Entities;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ConversationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public partial class MessageController : ControllerBase
{
    private readonly IMediator _mediator;
    public MessageController(IMediator mediator)
    {
        _mediator = mediator;
    }
    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var messages = await _mediator.Send(new GetAllMessagesQuery());
        return Ok(messages);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var message = await _mediator.Send(new GetMessageQuery(id));
        return Ok(message);
    }
    //GET api/Messages/Conversation/1?skip=1
    [HttpGet("Conversation/{id}")]
    public async Task<IActionResult> GetByConversationId(int id, int? skip)
    {
        if (skip == null)
        {
            skip = 0;
        }
        var messages = await _mediator.Send(new GetMessagesByConversationIdQuery(id, (int)skip));
        return Ok(messages);
    }
    [HttpGet("Conversation/{conversationId}/last")]
    public async Task<IActionResult> GetLast(int conversationId)
    {
        var m = await _mediator.Send(new GetLastMessageQuery(conversationId));
        return Ok(m);
    }
    [HttpPost]
    public async Task<IActionResult> SendClientMessage([FromBody] Message message)
    {
        await _mediator.Send(new SendClientMessageCommand(message));
        return CreatedAtAction(nameof(Get), new
        {
            id = message.Id
        }, message);
    }
}
