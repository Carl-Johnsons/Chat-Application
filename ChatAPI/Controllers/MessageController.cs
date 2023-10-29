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
            var messages = messageRepository.GetMessage();
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

        [HttpPost]
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
        [HttpDelete("DeleteIndividualMessage/{messageId}")]
        public IActionResult DeleteIndividualMessage(int messageId)
        {
            try
            {
                int result = messageRepository.DeleteIndividualMessage(messageId);
                if (result < 1)
                {
                    return BadRequest("Operation add individual message failed");
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

