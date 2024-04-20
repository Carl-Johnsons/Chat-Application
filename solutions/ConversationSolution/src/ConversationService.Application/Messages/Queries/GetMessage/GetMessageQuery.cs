using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Messages.Queries.GetMessage;

public class GetMessageQuery : IRequest<Message?>
{
    public int MessageId { get; set; }
    public GetMessageQuery(int messageId)
    {
        MessageId = messageId;
    }
}
