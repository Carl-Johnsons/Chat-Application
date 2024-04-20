using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Messages.Queries.GetAllMessages;

public class GetAllMessagesQuery : IRequest<List<Message>>
{
    public GetAllMessagesQuery()
    {
    }
}
