using MediatR;
using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.DTOs;
using ConversationService.Core.Entities;

namespace ConversationService.API.CQRS.UserCQRS.Commands.AddFriend;

public class AddFriendCommandHandler : IRequestHandler<AddFriendCommand, Conversation>
{
    private readonly IMediator _mediator;
    private readonly FriendRepository _friendRepo = new();
    private readonly FriendRequestRepository _friendRequestRepo = new();
    private readonly ConversationUsersRepository _conversationUserRepo = new();
    public AddFriendCommandHandler(IMediator mediator)
    {
        _mediator = mediator;
    }
    public async Task<Conversation> Handle(AddFriendCommand request, CancellationToken cancellationToken)
    {
        var receiverId = request.ReceiverId;
        var currentUserClaim = request.CurrentUserClaim;
        if (receiverId == null)
        {
            throw new Exception("ReceiverId cannot be null!");
        }
        // Check if friendRequest is existed
        var senderId = currentUserClaim.UserId;
        var frList = _friendRequestRepo.GetByReceiverId((int)receiverId);
        bool hasFriendRequest = false;
        foreach (var friendRequest in frList)
        {
            if (friendRequest.SenderId == senderId && friendRequest.ReceiverId == (int)receiverId
            || friendRequest.SenderId == (int)receiverId && friendRequest.ReceiverId == senderId)
            {
                hasFriendRequest = true;
            }
        }
        if (!hasFriendRequest)
        {
            throw new Exception("Friend request does not exist! Aborting operation add friend");
        }

        Friend friend = new()
        {
            UserId = senderId,
            FriendId = (int)receiverId
        };

        _friendRepo.Add(friend);

        // After adding the friend, send a request to remove the friend request
        _friendRequestRepo.Delete(senderId, (int)receiverId);
        //Check if existed conversation
        var cu = _conversationUserRepo.GetIndividualConversation(senderId, (int)receiverId);
        if (cu != null)
        {
            throw new Exception("2 users already have an existed conversation. Aborting creating a new one");
        }
        var conversation = new ConversationWithMembersId()
        {
            Type = "Individual",
            MembersId = [senderId, (int)receiverId]
        };
        await _mediator.Send(conversation, cancellationToken);
        return conversation;
    }
}
