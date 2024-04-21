namespace ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;

public class GetMemberListByConversationIdQueryHandler : IRequestHandler<GetMemberListByConversationIdQuery, List<ConversationUser>>
{
    private readonly IConversationUsersRepository _conversationUsersRepository;

    public GetMemberListByConversationIdQueryHandler(IConversationUsersRepository conversationUsersRepository)
    {
        _conversationUsersRepository = conversationUsersRepository;
    }

    public Task<List<ConversationUser>> Handle(GetMemberListByConversationIdQuery request, CancellationToken cancellationToken)
    {
        var conversationId = request.ConversationId;
        return _conversationUsersRepository.GetByConversationIdAsync(conversationId);
    }
}
