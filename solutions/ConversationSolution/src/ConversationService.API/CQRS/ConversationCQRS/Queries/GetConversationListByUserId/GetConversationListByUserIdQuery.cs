
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetConversationListByUserId;

public class GetConversationListByUserIdQuery : IRequest<List<ConversationUser>>
{
    public int UserId { get; set; }
    public GetConversationListByUserIdQuery(int userId)
    {
        UserId = userId;
    }
}
