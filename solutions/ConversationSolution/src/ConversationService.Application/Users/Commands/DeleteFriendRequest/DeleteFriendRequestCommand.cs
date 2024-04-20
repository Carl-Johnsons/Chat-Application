using ConversationService.Domain.DTOs;
using MediatR;

namespace ConversationService.Application.Users.Commands.DeleteFriendRequest;

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
