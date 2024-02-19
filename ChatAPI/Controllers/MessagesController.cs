using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DataAccess.Repositories.Interfaces;
using BussinessObject.Interfaces;

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
            var messages = messageRepository.GetMessageList();
            if (messages == null)
            {
                return NotFound();
            }
            return Ok(messages);
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var message = messageRepository.GetMessage(id);
            if (message == null)
            {
                return NotFound();
            }
            return Ok(message);
        }

        [HttpGet("GetLast/{userId}")]
        public IActionResult GetLast(int? userId)
        {
            var ml = messageRepository.GetLastestLastMessageList(userId);
            List<object> lastMessageList = ml.ToList<object>();
            return Ok(lastMessageList);
        }
        [HttpDelete("DeleteMessage/{messageId}")]
        public IActionResult DeleteMessage(int messageId)
        {
            try
            {
                int result = messageRepository.DeleteMessage(messageId);
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

