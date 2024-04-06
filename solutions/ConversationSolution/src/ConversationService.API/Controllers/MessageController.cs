using ConversationService.API.Repositories;
using ConversationService.Core.Constants;
using ConversationService.Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ConversationService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public partial class MessageController : ControllerBase
{
    private readonly MessageRepository messageRepository;
    public MessageController()
    {
        messageRepository = new MessageRepository();
    }
    [HttpGet]
    public IActionResult Get()
    {
        var messages = messageRepository.Get();
        if (messages == null)
        {
            return NotFound();
        }
        return Ok(messages);
    }
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var message = messageRepository.Get(id);
        if (message == null)
        {
            return NotFound();
        }
        return Ok(message);
    }
    //GET api/Messages/Conversation/1?skip=1
    [HttpGet("Conversation/{id}")]
    public IActionResult GetByConversationId(int id, int? skip)
    {
        if (skip == null)
        {
            skip = 0;
        }
        var messages = messageRepository.Get(id, (int)skip);
        if (messages == null)
        {
            return NotFound();
        }
        return Ok(messages);
    }
    [HttpGet("Conversation/{conversationId}/last")]
    public IActionResult GetLast(int? conversationId)
    {
        var m = messageRepository.GetLast(conversationId);
        return Ok(m);
    }
    [HttpPost]
    public IActionResult SendClientMessage([FromBody] Message message)
    {
        message.Time = DateTime.Now;
        message.Source = MessageConstant.Source.CLIENT;
        message.Active = true;

        messageRepository.AddMessage(message);
        return CreatedAtAction(nameof(Get), new
        {
            id = message.Id
        }, message);
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteMessage(int id)
    {
        try
        {
            int result = messageRepository.DeleteMessage(id);
            if (result < 1)
            {
                return BadRequest("Operation delete message failed");
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}
