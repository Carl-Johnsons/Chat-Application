namespace ConversationService.Application.Conversations.Queries.GetConversation;

public class GetConversationQuery : IRequest<Conversation?>
{
    public int ConversationId { get; set; }
    public GetConversationQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
