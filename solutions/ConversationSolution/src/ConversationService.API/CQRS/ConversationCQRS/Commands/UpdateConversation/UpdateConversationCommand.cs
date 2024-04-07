
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Commands.UpdateConversation;

public class UpdateConversationCommand : IRequest
{
    public Conversation Conversation { get; set; }
    public UpdateConversationCommand(Conversation conversation)
    {
        Conversation = conversation;
    }
}
