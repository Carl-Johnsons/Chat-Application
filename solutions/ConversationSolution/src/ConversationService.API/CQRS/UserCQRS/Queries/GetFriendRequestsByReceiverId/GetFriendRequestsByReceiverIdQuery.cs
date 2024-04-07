
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.User.Queries.GetFriendRequestsByReceiverId;

public class GetFriendRequestsByReceiverIdQuery : IRequest<List<FriendRequest>>
{
    public int ReceiverId { get; set; }
    public GetFriendRequestsByReceiverIdQuery(int receiverId)
    {
        ReceiverId = receiverId;
    }
}
