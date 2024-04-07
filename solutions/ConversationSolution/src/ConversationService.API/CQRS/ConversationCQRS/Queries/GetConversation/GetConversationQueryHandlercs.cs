using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetConversation;

public class GetConversationQueryHandlercs : IRequestHandler<GetConversationQuery, Conversation?>
{
    private readonly ConversationRepository _conversationRepository = new();
    public Task<Conversation?> Handle(GetConversationQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_conversationRepository.Get(request.ConversationId));
    }
}
