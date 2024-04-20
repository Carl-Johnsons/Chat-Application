using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Users.Queries.GetFriends;

public class GetFriendsQuery : IRequest<List<Friend>>
{
    public int UserId { get; set; }
    public GetFriendsQuery(int userId)
    {
        UserId = userId;
    }
}
