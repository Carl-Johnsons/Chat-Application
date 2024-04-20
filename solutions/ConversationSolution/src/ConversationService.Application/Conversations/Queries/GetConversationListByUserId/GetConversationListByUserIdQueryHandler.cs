namespace ConversationService.Application.Conversations.Queries.GetConversationListByUserId;

public class GetConversationListByUserIdQueryHandler : IRequestHandler<GetConversationListByUserIdQuery, List<ConversationUser>>
{
    private readonly ConversationUsersRepository _conversationUsersRepository = new();
    public Task<List<ConversationUser>> Handle(GetConversationListByUserIdQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        return Task.FromResult(_conversationUsersRepository.GetByUserId(userId));

    }
}
