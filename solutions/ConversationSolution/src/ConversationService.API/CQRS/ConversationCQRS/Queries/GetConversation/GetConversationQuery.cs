
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetConversation;

public class GetConversationQuery : IRequest<Conversation?>
{
    public int ConversationId { get; set; }
    public GetConversationQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
