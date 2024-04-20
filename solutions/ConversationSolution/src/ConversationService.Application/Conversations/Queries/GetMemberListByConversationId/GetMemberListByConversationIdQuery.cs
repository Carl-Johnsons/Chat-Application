using ConversationService.Domain.Entities;

namespace ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;

public class GetMemberListByConversationIdQuery : IRequest<List<ConversationUser>>
{
    public int ConversationId { get; set; }
    public GetMemberListByConversationIdQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
