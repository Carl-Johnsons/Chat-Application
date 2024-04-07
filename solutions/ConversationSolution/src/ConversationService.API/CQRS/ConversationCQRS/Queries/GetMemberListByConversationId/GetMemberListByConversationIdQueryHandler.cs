using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetMemberListByConversationId;

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
