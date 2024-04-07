
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.User.Queries.GetFriendRequestBySenderId;

public class GetFriendRequestsBySenderIdQuery : IRequest<List<FriendRequest>>
{
    public int SenderId { get; set; }
    public GetFriendRequestsBySenderIdQuery(int senderId)
    {
        SenderId = senderId;
    }
}
