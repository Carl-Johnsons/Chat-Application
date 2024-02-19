using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/Messages/individual")]
    [ApiController]
    [Authorize]
    public class IndividualMessageController : ControllerBase
    {
        private readonly IIndividualMessageRepository individualMessageRepository;
        public IndividualMessageController()
        {
            individualMessageRepository = new IndividualMessageRepository();
        }

        [HttpGet]
        public IActionResult Get()
        {
            var individualMessages = individualMessageRepository.Get();
            return Ok(individualMessages);
        }

        [HttpGet("{senderId}/{receiverId}")]
        public IActionResult Get(int senderId, int receiverId)
        {
            var individualMessages = individualMessageRepository.Get(senderId, receiverId);
            if (individualMessages == null)
            {
                return NotFound();
            }
            return Ok(individualMessages);
        }

        [HttpGet("{senderId}/{receiverId}/skip/{skipBatch}")]
        public IActionResult Get(int senderId, int receiverId, int skipBatch)
        {
            var individualMessages = individualMessageRepository.Get(senderId, receiverId, skipBatch);
            if (individualMessages == null)
            {
                return NotFound();
            }
            return Ok(individualMessages);
        }

        [HttpGet("GetLast/{senderId}/{receiverId}")]
        public IActionResult GetLastIndividualMessage(int senderId, int receiverId)
        {
            var lastIndividualMessage = individualMessageRepository.GetLast(senderId, receiverId);
            if (lastIndividualMessage == null)
            {
                return NotFound();
            }
            return Ok(lastIndividualMessage);
        }

        [HttpPost]
        public IActionResult SendIndividualMessage([FromBody] IndividualMessage individualMessage)
        {
            individualMessageRepository.Add(individualMessage);
            return CreatedAtAction(nameof(Get), new
            {
                senderId = individualMessage.Message.SenderId,
                receiverId = individualMessage.UserReceiverId
            }, individualMessage);
        }
        [HttpDelete]
        public IActionResult Delete(int individualId)
        {
            try
            {
                int result = individualMessageRepository.Delete(individualId);
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
