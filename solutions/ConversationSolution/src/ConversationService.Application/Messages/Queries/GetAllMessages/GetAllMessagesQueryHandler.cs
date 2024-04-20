using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Messages.Queries.GetAllMessages;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, List<Message>>
{
    private readonly MessageRepository _messageRepository = new();
    public Task<List<Message>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get());
    }
}
