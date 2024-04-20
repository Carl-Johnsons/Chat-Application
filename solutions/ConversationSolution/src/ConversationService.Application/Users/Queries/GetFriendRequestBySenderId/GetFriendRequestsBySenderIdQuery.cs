using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Users.Queries.GetFriendRequestBySenderId;

public class GetFriendRequestsBySenderIdQuery : IRequest<List<FriendRequest>>
{
    public int SenderId { get; set; }
    public GetFriendRequestsBySenderIdQuery(int senderId)
    {
        SenderId = senderId;
    }
}
