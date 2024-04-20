using ConversationService.Domain.DTOs;
using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Users.Commands.AddFriend;

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
