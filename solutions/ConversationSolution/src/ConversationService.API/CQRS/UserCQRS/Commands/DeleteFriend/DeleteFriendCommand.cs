using ConversationService.Core.DTOs;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.DeleteFriend;

public class DeleteFriendCommand : IRequest
{
    public UserClaim UserClaim { get; set; }
    public int FriendId { get; set; }
    public DeleteFriendCommand(UserClaim userClaim, int friendId)
    {
        UserClaim = userClaim;
        FriendId = friendId;
    }
}
