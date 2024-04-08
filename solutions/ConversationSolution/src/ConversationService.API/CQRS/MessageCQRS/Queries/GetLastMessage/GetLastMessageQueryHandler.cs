using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetLastMessage;

public class GetLastMessageQueryHandler : IRequestHandler<GetLastMessageQuery, Message?>
{
    private readonly MessageRepository _messageRepository = new();

    public Task<Message?> Handle(GetLastMessageQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.GetLast(request.ConversationId));
    }
}
