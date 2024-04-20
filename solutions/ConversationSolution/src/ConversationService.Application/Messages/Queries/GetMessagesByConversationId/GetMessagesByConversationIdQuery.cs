using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Messages.Queries.GetMessagesByConversationId;

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
