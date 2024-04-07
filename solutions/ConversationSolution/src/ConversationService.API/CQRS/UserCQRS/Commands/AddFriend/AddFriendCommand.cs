using ConversationService.Core.DTOs;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.AddFriend;

public class AddFriendCommand : IRequest<Conversation>
{
    public UserClaim CurrentUserClaim { get; set; }
    public int? ReceiverId { get; set; }
    public AddFriendCommand(UserClaim currentUserClaim, int? receiverId)
    {
        CurrentUserClaim = currentUserClaim;
        ReceiverId = receiverId;
    }
}
