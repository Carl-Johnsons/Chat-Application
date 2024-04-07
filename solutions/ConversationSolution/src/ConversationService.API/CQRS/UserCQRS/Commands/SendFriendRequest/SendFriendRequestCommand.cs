
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.SendFriendRequest;

public class SendFriendRequestCommand : IRequest
{
    public FriendRequest FriendRequest { get; set; }
    public SendFriendRequestCommand(FriendRequest friendRequest)
    {
        FriendRequest = friendRequest;
    }
}
