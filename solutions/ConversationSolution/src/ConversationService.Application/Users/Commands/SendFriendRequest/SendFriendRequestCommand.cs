using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Users.Commands.SendFriendRequest;

public class SendFriendRequestCommand : IRequest
{
    public FriendRequest FriendRequest { get; set; }
    public SendFriendRequestCommand(FriendRequest friendRequest)
    {
        FriendRequest = friendRequest;
    }
}
