using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Messages.Queries.GetMessagesByConversationId;

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, List<Message>>
{
    private readonly MessageRepository _messageRepository = new();
    public Task<List<Message>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get(request.ConversationId, request.Skip));
    }
}
