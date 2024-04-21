namespace ConversationService.Application.Conversations.Queries.GetConversationListByUserId;

public class GetConversationListByUserIdQueryHandler : IRequestHandler<GetConversationListByUserIdQuery, List<ConversationUser>>
{
    private readonly IConversationUsersRepository _conversationUsersRepository;

    public GetConversationListByUserIdQueryHandler(IConversationUsersRepository conversationUsersRepository)
    {
        _conversationUsersRepository = conversationUsersRepository;
    }

    public Task<List<ConversationUser>> Handle(GetConversationListByUserIdQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;

        return Task.FromResult(_conversationUsersRepository.GetByUserId(userId));

    }
}
