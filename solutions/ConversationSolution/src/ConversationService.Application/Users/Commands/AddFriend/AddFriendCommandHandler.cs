namespace ConversationService.Application.Users.Commands.AddFriend;

public class AddFriendCommandHandler : IRequestHandler<AddFriendCommand, Conversation>
{
    private readonly IMediator _mediator;
    private readonly IFriendRepository _friendRepo;
    private readonly IFriendRequestRepository _friendRequestRepo;
    private readonly IConversationUsersRepository _conversationUserRepo;
    private readonly IUnitOfWork _unitOfWork;

    public AddFriendCommandHandler(IMediator mediator, IFriendRepository friendRepo, IFriendRequestRepository friendRequestRepo, IConversationUsersRepository conversationUserRepo, IUnitOfWork unitOfWork)
    {
        _mediator = mediator;
        _friendRepo = friendRepo;
        _friendRequestRepo = friendRequestRepo;
        _conversationUserRepo = conversationUserRepo;
        _unitOfWork = unitOfWork;
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
        var frList = await _friendRequestRepo.GetByReceiverIdAsync((int)receiverId);
        bool hasFriendRequest = false;
        foreach (var fr in frList)
        {
            if (fr.SenderId == senderId && fr.ReceiverId == (int)receiverId
            || fr.SenderId == (int)receiverId && fr.ReceiverId == senderId)
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
        var friendRequest = await _friendRequestRepo.GetBySenderIdAndReceiverIdAsync(senderId, (int)receiverId);
        if (friendRequest != null)
        {
            _friendRequestRepo.Remove(friendRequest);
        }
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
        await _unitOfWork.SaveChangeAsync();
        return conversation;
    }
}
