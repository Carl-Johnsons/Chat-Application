using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DataAccess.Repositories.Interfaces;
using BussinessObject.Constants;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly IMessageRepository messageRepository;
        public MessagesController()
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
        public IActionResult SendClientTextMessage([FromBody] Message message)
        {
            message.Time = DateTime.Now;
            message.Source = MessageSource.CLIENT;
            message.Format = MessageFormat.TEXT;
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
}

