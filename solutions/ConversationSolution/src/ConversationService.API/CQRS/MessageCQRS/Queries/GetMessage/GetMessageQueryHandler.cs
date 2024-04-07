using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetMessage;

public class GetMessageQueryHandler : IRequestHandler<GetMessageQuery, Message?>
{
    private readonly MessageRepository _messageRepository = new();

    public Task<Message?> Handle(GetMessageQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get(request.MessageId));
    }
}
