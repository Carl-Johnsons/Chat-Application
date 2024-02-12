using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MessagesController : ControllerBase
    {
        private readonly MessageRepository messageRepository;
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

        [HttpGet("GetLastIndividualMessage/{senderId}/{receiverId}")]
        public IActionResult GetLastIndividualMessage(int senderId, int receiverId)
        {
            var lastIndividualMessage = messageRepository.GetLastIndividualMessage(senderId, receiverId);
            if (lastIndividualMessage == null)
            {
                return NotFound();
            }
            return Ok(lastIndividualMessage);
        }
        [HttpGet("GetGroupMessage")]
        public IActionResult GetGroupMessage()
        {
            var gmList = messageRepository.GetGroupMessageList();
            return Ok(gmList);
        }
        [HttpGet("GetGroupMessage/{groupId}")]
        public IActionResult GetGroupMessage(int groupId)
        {
            var gmList = messageRepository.GetGroupMessageList(groupId);
            return Ok(gmList);
        }

        [HttpPost("SendIndividualMessage")]
        public IActionResult SendIndividualMessage([FromBody] IndividualMessage individualMessage)
        {
            messageRepository.AddIndividualMessage(individualMessage);
            return CreatedAtAction(nameof(GetIndividualMessage), new
            {
                senderId = individualMessage.Message.SenderId,
                receiverId = individualMessage.UserReceiverId
            }, individualMessage);
        }

        [HttpPost("SendGroupMessage")]
        public IActionResult SendGroupMessage([FromBody] GroupMessage groupMessage)
        {
            messageRepository.AddGroupMessage(groupMessage);
            return CreatedAtAction(nameof(GetGroupMessage), new
            {
                groupId = groupMessage.GroupReceiverId,
            }, groupMessage);
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

