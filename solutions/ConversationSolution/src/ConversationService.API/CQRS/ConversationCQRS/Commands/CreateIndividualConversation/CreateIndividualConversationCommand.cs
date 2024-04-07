using ConversationService.Core.DTOs;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Commands.CreateIndividualConversation;

public class CreateIndividualConversationCommand : IRequest
{
    public ConversationWithMembersId ConversationWithMembersId { get; set; }
    public CreateIndividualConversationCommand(ConversationWithMembersId conversationWithMembersId)
    {
        ConversationWithMembersId = conversationWithMembersId;
    }
}
