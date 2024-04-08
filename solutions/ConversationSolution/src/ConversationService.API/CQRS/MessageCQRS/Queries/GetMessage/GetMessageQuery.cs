
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetMessage;

public class GetMessageQuery : IRequest<Message?>
{
    public int MessageId { get; set; }
    public GetMessageQuery(int messageId)
    {
        MessageId = messageId;
    }
}
