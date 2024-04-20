using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Messages.Queries.GetLastMessage;

public class GetLastMessageQueryHandler : IRequestHandler<GetLastMessageQuery, Message?>
{
    private readonly MessageRepository _messageRepository = new();

    public Task<Message?> Handle(GetLastMessageQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.GetLast(request.ConversationId));
    }
}
