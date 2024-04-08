
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetMemberListByConversationId;

public class GetMemberListByConversationIdQuery : IRequest<List<ConversationUser>>
{
    public int ConversationId { get; set; }
    public GetMemberListByConversationIdQuery(int conversationId)
    {
        ConversationId = conversationId;
    }
}
