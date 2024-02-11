using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupUserRepository _groupUserRepository;

        public GroupController()
        {
            _groupRepository = new GroupRepository();
            _groupUserRepository = new GroupUserRepository();
        }
        [HttpGet]
        public IActionResult Get()
        {
            var group = _groupRepository.Get();
            return Ok(group);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var group = _groupRepository.Get(id);
            return Ok(group);
        }
        [HttpGet("GetGroupUserByGroupId/{groupId}")]
        public IActionResult GetGroupUserByGroupId(int groupId)
        {
            try
            {
                var groupUserList = _groupUserRepository.GetByGroupId(groupId);
                return Ok(groupUserList);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateGroup([FromBody] Group group)
        {
            try
            {
                _groupRepository.Add(group);

                // After add the group to the database, the generated Id should have been attach to the group object
                // Add relationshop for leader and group
                _groupUserRepository.Add(new GroupUser()
                {
                    GroupId = group.GroupId,
                    UserId = group.GroupLeaderId
                });
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost("Join")]
        public IActionResult JoinGroup([FromBody] GroupUser groupUser)
        {
            try
            {
                _groupUserRepository.Add(groupUser);
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                _groupRepository.Delete(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpDelete("Leave")]
        public IActionResult Leave([FromBody] GroupUser groupUser)
        {
            try
            {
                _groupUserRepository.Delete(groupUser.GroupId, groupUser.UserId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }
}
