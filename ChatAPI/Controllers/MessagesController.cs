using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessagesController : ControllerBase
    {
        MessageRepository messageRepository;
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

        [HttpGet("GetIndividualMessage")]
        public IActionResult GetIndividualMessage()
        {
            var individualMessages = messageRepository.GetIndividualMessageList();
            if (individualMessages == null)
            {
                return NotFound();
            }
            return Ok(individualMessages);
        }

        [HttpGet("GetIndividualMessage/{senderId}/{receiverId}")]
        public IActionResult GetIndividualMessage(int senderId, int receiverId)
        {
            var individualMessages = messageRepository.GetIndividualMessageList(senderId, receiverId);
            if (individualMessages == null)
            {
                return NotFound();
            }
            return Ok(individualMessages);
        }


        [HttpPost("SendIndividualMessage")]
        public IActionResult SendIndividualMessage([FromBody] IndividualMessage individualMessage)
        {
            if (individualMessage == null)
            {
                return NotFound();
            }
            int result = messageRepository.AddIndividualMessage(individualMessage);
            if (result < 1)
            {
                return BadRequest("Operation add individual message failed");
            }
            return CreatedAtAction(nameof(GetIndividualMessage), new
            {
                senderId = individualMessage.Message.SenderId,
                receiverId = individualMessage.UserReceiverId
            }, individualMessage);
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

        [HttpDelete("DeleteIndividualMessage/{individualId}")]
        public IActionResult DeleteIndividualMessage(int individualId)
        {
            try
            {
                int result = messageRepository.DeleteIndividualMessage(individualId);
                if (result < 1)
                {
                    return BadRequest("Operation delete individual message failed");
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

