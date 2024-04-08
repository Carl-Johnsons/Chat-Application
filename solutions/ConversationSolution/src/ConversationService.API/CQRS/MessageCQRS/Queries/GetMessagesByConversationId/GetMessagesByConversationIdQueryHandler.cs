using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Queries.GetMessagesByConversationId;

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, List<Message>>
{
    private readonly MessageRepository _messageRepository = new();
    public Task<List<Message>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_messageRepository.Get(request.ConversationId, request.Skip));
    }
}
