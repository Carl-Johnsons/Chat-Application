using ConversationService.Core.DTOs;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Commands.CreateGroupConversation;

public class CreateGroupConversationCommand : IRequest
{
    public GroupConversationWithMembersId ConversationWithMembersId { get; set; }
    public CreateGroupConversationCommand(GroupConversationWithMembersId conversationWithMembersId)
    {
        ConversationWithMembersId = conversationWithMembersId;
    }
}
