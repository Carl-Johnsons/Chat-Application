namespace ConversationService.Application.Conversations.Queries.GetConversationListByUserId;

public class GetConversationListByUserIdQuery : IRequest<List<ConversationUser>>
{
    public int UserId { get; set; }
    public GetConversationListByUserIdQuery(int userId)
    {
        UserId = userId;
    }
}
