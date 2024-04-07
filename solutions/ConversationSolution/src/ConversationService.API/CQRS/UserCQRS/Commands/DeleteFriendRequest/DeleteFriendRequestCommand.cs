using ConversationService.Core.DTOs;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.DeleteFriendRequest;

public class DeleteFriendRequestCommand : IRequest
{
    public int SenderId { get; set; }
    public UserClaim UserClaim { get; set; }
    public DeleteFriendRequestCommand(int senderId, UserClaim userClaim)
    {
        SenderId = senderId;
        UserClaim = userClaim;
    }
}
