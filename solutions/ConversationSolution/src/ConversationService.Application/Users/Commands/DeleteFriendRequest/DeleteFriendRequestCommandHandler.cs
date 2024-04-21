namespace ConversationService.Application.Users.Commands.DeleteFriendRequest;

public class DeleteFriendRequestCommandHandler : IRequestHandler<DeleteFriendRequestCommand>
{
    private readonly IFriendRequestRepository _friendRequestRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteFriendRequestCommandHandler(IFriendRequestRepository friendRequestRepository, IUnitOfWork unitOfWork)
    {
        _friendRequestRepository = friendRequestRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var fr = await _friendRequestRepository.GetBySenderIdAndReceiverIdAsync(request.SenderId, request.UserClaim.UserId);
        if (fr != null)
        {
            _friendRequestRepository.Remove(fr);
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
