
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetAllMessages;

public class GetAllMessagesQuery : IRequest<List<Message>>
{
    public GetAllMessagesQuery()
    {
    }
}
