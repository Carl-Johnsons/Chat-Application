using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Messages.Queries.GetMessage;

public class GetMessageQueryHandler : IRequestHandler<GetMessageQuery, Message?>
{
    private readonly MessageRepository _messageRepository = new();

    public Task<Message?> Handle(GetMessageQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get(request.MessageId));
    }
}
