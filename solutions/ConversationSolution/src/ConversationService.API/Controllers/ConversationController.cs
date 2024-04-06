using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using ConversationService.Core.Entities;
using ConversationService.Core.DTOs;
using ConversationService.API.Repositories;

namespace ChatAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
//[Authorize]
public partial class ConversationController : ControllerBase
{
    private ConversationRepository _conversationRepository;
    private ConversationUsersRepository _conversationUsersRepository;
    public ConversationController()
    {
        _conversationRepository = new ConversationRepository();
        _conversationUsersRepository = new ConversationUsersRepository();
    }

    [HttpGet]
    public IActionResult Get()
    {
        var conversations = _conversationRepository.Get();
        return Ok(conversations);
    }
    [HttpGet("{id}")]
    public IActionResult Get(int id)
    {
        var conversation = _conversationRepository.Get(id);
        return Ok(conversation);
    }
    [HttpGet("User/{userId}")]
    public IActionResult GetConversationListByUserId(int userId)
    {
        var cuList = _conversationUsersRepository.GetByUserId(userId);
        // base serialization make derived class return to base class, so using alternative way
        var jsonSettings = new JsonSerializerSettings
        {
            Formatting = Formatting.Indented, // Use indented formatting
            ContractResolver = new DefaultContractResolver
            {
                NamingStrategy = new CamelCaseNamingStrategy()
            }
        };

        var json = JsonConvert.SerializeObject(cuList, jsonSettings);
        return Content(json, "application/json");
    }
    [HttpGet("Member/{conversationId}")]
    public IActionResult GetMemberListByConversationId(int conversationId)
    {
        var cuList = _conversationUsersRepository.GetByConversationId(conversationId);
        return Ok(cuList);
    }

    [HttpPost]
    public IActionResult CreateIndividualConversation([FromBody] ConversationWithMembersId conversationWithMembersId)
    {
        _conversationRepository.AddConversationWithMemberId(conversationWithMembersId);
        return CreatedAtAction(nameof(Get), new
        {
            id = conversationWithMembersId.Id
        }, conversationWithMembersId);
    }
    [HttpPost("Group")]
    public IActionResult CreateGroupConversation([FromBody] GroupConversationWithMembersId conversationWithMembersId)
    {
        if (conversationWithMembersId.MembersId == null || (conversationWithMembersId.MembersId != null && conversationWithMembersId.MembersId.Count <= 2))
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "Can't create a group less than 3 members");
        }
        _conversationRepository.AddConversationWithMemberId(conversationWithMembersId);
        return CreatedAtAction(nameof(Get), new
        {
            id = conversationWithMembersId.Id
        }, conversationWithMembersId);
    }
    [HttpPut]
    public IActionResult Update([FromBody] Conversation conversation)
    {
        _conversationRepository.Update(conversation);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        _conversationRepository.Delete(id);
        return NoContent();
    }
}
