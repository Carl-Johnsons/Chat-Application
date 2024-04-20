namespace ConversationService.Application.Conversations.Queries.GetAllConversations;

public class GetAllConversationsQueryHandler : IRequestHandler<GetAllConversationsQuery, List<Conversation>>
{
    private readonly ConversationRepository _conversationRepository = new();
    public Task<List<Conversation>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_conversationRepository.Get());
    }
}
