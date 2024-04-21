namespace ConversationService.Application.Conversations.Queries.GetAllConversations;

public class GetAllConversationsQueryHandler : IRequestHandler<GetAllConversationsQuery, List<Conversation>>
{
    private readonly IConversationRepository _conversationRepository;

    public GetAllConversationsQueryHandler(IConversationRepository conversationRepository)
    {
        _conversationRepository = conversationRepository;
    }

    public Task<List<Conversation>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
    {
        return _conversationRepository.GetAsync();
    }
}
