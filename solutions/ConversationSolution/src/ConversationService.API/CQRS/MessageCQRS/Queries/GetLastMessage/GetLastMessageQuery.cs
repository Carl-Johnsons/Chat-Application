
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetLastMessage;

public class GetLastMessageQuery : IRequest<Message?>
{
    public int ConversationId { get; set; }
    public GetLastMessageQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
