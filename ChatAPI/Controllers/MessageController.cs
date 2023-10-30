using DataAccess.Repositories;
using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Http.HttpResults;
using Newtonsoft.Json;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MessageController : ControllerBase
    {
        MessageRepository messageRepository;
        public MessageController()
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
            return CreatedAtAction(nameof(Get), new { id = individualMessage.MessageId }, null);

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

