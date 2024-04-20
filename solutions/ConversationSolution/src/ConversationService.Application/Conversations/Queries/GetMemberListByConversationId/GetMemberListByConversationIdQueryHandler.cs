using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;

public class GetMemberListByConversationIdQueryHandler : IRequestHandler<GetMemberListByConversationIdQuery, List<ConversationUser>>
{
    private readonly ConversationUsersRepository _conversationUsersRepository = new();
    public Task<List<ConversationUser>> Handle(GetMemberListByConversationIdQuery request, CancellationToken cancellationToken)
    {
        var conversationId = request.ConversationId;
        var cuList = _conversationUsersRepository.GetByConversationId(conversationId);
        return Task.FromResult(cuList);
    }
}
