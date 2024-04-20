using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Users.Queries.GetFriendRequestsByReceiverId;

public class GetFriendRequestsByReceiverIdQuery : IRequest<List<FriendRequest>>
{
    public int ReceiverId { get; set; }
    public GetFriendRequestsByReceiverIdQuery(int receiverId)
    {
        ReceiverId = receiverId;
    }
}
