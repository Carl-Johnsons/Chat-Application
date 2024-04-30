using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

using ConversationService.API.Controllers;
using ConversationService.Application.Conversations.Queries.GetAllConversations;
using ConversationService.Application.Conversations.Queries.GetConversation;
using ConversationService.Application.Conversations.Queries.GetConversationListByUserId;
using ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;
using ConversationService.Application.Conversations.Commands.CreateIndividualConversation;
using ConversationService.Application.Conversations.Commands.CreateGroupConversation;
using ConversationService.Application.Conversations.Commands.UpdateConversation;
using ConversationService.Application.Conversations.Commands.DeleteConversation;
using ConversationService.Domain.Entities;
using ConversationService.Domain.DTOs;
using MediatR;
using Microsoft.AspNetCore.Authorization;

namespace ChatAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public partial class ConversationController : ApiControllerBase
{
    public ConversationController(ISender sender) : base(sender)
    {
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var conversations = await _sender.Send(new GetAllConversationsQuery());
        return Ok(conversations);
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> Get(int id)
    {
        var conversation = await _sender.Send(new GetConversationQuery(id));
        return Ok(conversation);
    }
    [HttpGet("User/{userId}")]
    public async Task<IActionResult> GetConversationListByUserId(int userId)
    {
        var query = new GetConversationListByUserIdQuery(userId);
        var cuList = await _sender.Send(query);

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
    public async Task<IActionResult> GetMemberListByConversationId(int conversationId)
    {
        var query = new GetMemberListByConversationIdQuery(conversationId);
        var cuList = await _sender.Send(query);
        return Ok(cuList);
    }

    [HttpPost]
    public async Task<IActionResult> CreateIndividualConversation([FromBody] ConversationWithMembersId conversationWithMembersId)
    {
        var command = new CreateIndividualConversationCommand(conversationWithMembersId);
        await _sender.Send(command);
        return CreatedAtAction(nameof(Get), new
        {
            id = conversationWithMembersId.Id
        }, conversationWithMembersId);
    }
    [HttpPost("Group")]
    public async Task<IActionResult> CreateGroupConversation([FromBody] GroupConversationWithMembersId conversationWithMembersId)
    {
        if (conversationWithMembersId.MembersId == null || (conversationWithMembersId.MembersId != null && conversationWithMembersId.MembersId.Count <= 2))
        {
            return StatusCode(StatusCodes.Status406NotAcceptable, "Can't create a group less than 3 members");
        }
        var command = new CreateGroupConversationCommand(conversationWithMembersId);
        await _sender.Send(command);
        return CreatedAtAction(nameof(Get), new
        {
            id = conversationWithMembersId.Id
        }, conversationWithMembersId);
    }
    [HttpPut]
    public async Task<IActionResult> Update([FromBody] Conversation conversation)
    {
        var command = new UpdateConversationCommand(conversation);
        await _sender.Send(command);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var command = new DeleteConversationCommand(id);
        await _sender.Send(command);
        return NoContent();
    }
}
