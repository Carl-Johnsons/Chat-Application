namespace ConversationService.Application.Conversations.Queries;

public record GetConversationQuery(Guid ConversationId) : IRequest<Conversation?>;
public class GetConversationQueryHandlercs : IRequestHandler<GetConversationQuery, Conversation?>
{
    private readonly IConversationRepository _conversationRepository;

    public GetConversationQueryHandlercs(IConversationRepository conversationRepository)
    {
        _conversationRepository = conversationRepository;
    }

    public Task<Conversation?> Handle(GetConversationQuery request, CancellationToken cancellationToken)
    {
        return _conversationRepository.GetByIdAsync(request.ConversationId);
    }
}
