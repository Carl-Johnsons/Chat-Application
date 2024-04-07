
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetMessagesByConversationId;

public class GetMessagesByConversationIdQuery : IRequest<List<Message>>
{
    public int ConversationId { get; set; }
    public int Skip { get; set; }
    public GetMessagesByConversationIdQuery(int conversationId, int skip)
    {
        ConversationId = conversationId;
        Skip = skip;
    }
}
