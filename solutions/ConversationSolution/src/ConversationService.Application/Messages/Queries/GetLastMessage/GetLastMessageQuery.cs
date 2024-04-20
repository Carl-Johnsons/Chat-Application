using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Messages.Queries.GetLastMessage;

public class GetLastMessageQuery : IRequest<Message?>
{
    public int ConversationId { get; set; }
    public GetLastMessageQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
