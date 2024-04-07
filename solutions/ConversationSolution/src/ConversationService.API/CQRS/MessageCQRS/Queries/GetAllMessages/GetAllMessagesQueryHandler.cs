using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetAllMessages;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, List<Message>>
{
    private readonly MessageRepository _messageRepository = new();
    public Task<List<Message>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get());
    }
}
