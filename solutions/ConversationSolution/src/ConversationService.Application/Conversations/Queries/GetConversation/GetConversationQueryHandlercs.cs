namespace ConversationService.Application.Conversations.Queries.GetConversation;

public class GetConversationQueryHandlercs : IRequestHandler<GetConversationQuery, Conversation?>
{
    private readonly ConversationRepository _conversationRepository = new();
    public Task<Conversation?> Handle(GetConversationQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_conversationRepository.Get(request.ConversationId));
    }
}
