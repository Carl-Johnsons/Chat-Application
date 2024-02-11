using AutoMapper;
using BussinessObject.Constants;
using BussinessObject.DTO;
using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;
        private readonly IGroupUserRepository _groupUserRepository;

        private readonly MapperConfiguration mapperConfig;
        private readonly Mapper mapper;
        public GroupController()
        {
            _groupRepository = new GroupRepository();
            _groupUserRepository = new GroupUserRepository();

            mapperConfig = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<User, PublicUserDTO>();
                cfg.CreateMap<GroupUser, GroupPublicUserDTO>();
            });
            mapper = new Mapper(mapperConfig);
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
                var groupPublicUserDTO = mapper.Map<List<GroupUser>, List<GroupPublicUserDTO>>(groupUserList);
                return Ok(groupPublicUserDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPost]
        public IActionResult CreateGroup([FromBody] GroupWithLeaderId group)
        {
            try
            {
                _groupRepository.Add(group);

                // After add the group to the database, the generated Id should have been attach to the group object
                // Add relationshop for leader and group
                _groupUserRepository.Add(new GroupUser()
                {
                    GroupId = group.GroupId,
                    UserId = group.GroupLeaderId,
                    Role = GroupUserRole.LEADER
                });
                return CreatedAtAction(nameof(Get), new { id = group.GroupId }, group);
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
    public class GroupWithLeaderId : Group
    {
        [Required]
        [JsonProperty("groupLeaderId")]
        public int GroupLeaderId { get; set; }
    }
}
