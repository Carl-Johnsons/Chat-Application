namespace ConversationService.Application.Users.Commands.DeleteFriend;

public class DeleteFriendCommandHandler : IRequestHandler<DeleteFriendCommand>
{
    private readonly IFriendRepository _friendRepo;
    private readonly IUnitOfWork _unitOfWork;
    public DeleteFriendCommandHandler(IFriendRepository friendRepo, IUnitOfWork unitOfWork)
    {
        _friendRepo = friendRepo;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteFriendCommand request, CancellationToken cancellationToken)
    {
        var friend = _friendRepo.GetFriendsByUserIdOrFriendId(request.UserClaim.UserId, request.FriendId);
        if (friend != null)
        {
            _friendRepo.Remove(friend);
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
