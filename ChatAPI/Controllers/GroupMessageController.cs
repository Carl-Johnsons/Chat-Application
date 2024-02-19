using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/Messages/group")]
    [ApiController]
    [Authorize]
    public class GroupMessageController : ControllerBase
    {
        private readonly IGroupMessageRepository groupMessageRepository;
        public GroupMessageController()
        {
            groupMessageRepository = new GroupMessageRepository();
        }
        [HttpGet]
        public IActionResult Get()
        {
            var gmList = groupMessageRepository.Get();
            return Ok(gmList);
        }
        [HttpGet("{groupId}")]
        public IActionResult Get(int groupId)
        {
            var gmList = groupMessageRepository.Get(groupId);
            return Ok(gmList);
        }
        [HttpGet("{groupId}/skip/{skipBatch}")]
        public IActionResult GetGroupMessage(int groupId, int skipBatch)
        {
            var gmList = groupMessageRepository.Get(groupId, skipBatch);
            return Ok(gmList);
        }
        [HttpGet("GetLastByUserId/{userId}")]
        public IActionResult GetLastByUserId(int userId)
        {
            var lastGroupMessageList = groupMessageRepository.GetLastByUserId(userId);
            if (lastGroupMessageList == null)
            {
                return NotFound();
            }
            return Ok(lastGroupMessageList);
        }
        [HttpGet("GetLastByGroupId/{groupId}")]
        public IActionResult GetLastByGroupId(int groupId)
        {
            var lastGroupMessage = groupMessageRepository.GetLastByGroupId(groupId);
            if (lastGroupMessage == null)
            {
                return NotFound();
            }
            return Ok(lastGroupMessage);
        }
        [HttpPost]
        public IActionResult Send([FromBody] GroupMessage groupMessage)
        {
            groupMessageRepository.Add(groupMessage);
            return CreatedAtAction(nameof(Get), new
            {
                groupId = groupMessage.GroupReceiverId,
            }, groupMessage);
        }

    }
}
