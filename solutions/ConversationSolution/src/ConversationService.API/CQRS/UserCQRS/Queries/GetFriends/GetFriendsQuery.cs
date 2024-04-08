
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.User.Queries.GetFriends;

public class GetFriendsQuery : IRequest<List<Friend>>
{
    public int UserId { get; set; }
    public GetFriendsQuery(int userId)
    {
        UserId = userId;
    }
}
