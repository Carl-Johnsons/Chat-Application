namespace ConversationService.Application.Users.Commands.SendFriendRequest;

public class SendFriendRequestCommandHandler : IRequestHandler<SendFriendRequestCommand>
{
    private readonly IFriendRequestRepository _friendRequestRepository;
    private readonly IUnitOfWork _unitOfWork;

    public SendFriendRequestCommandHandler(IFriendRequestRepository friendRequestRepository, IUnitOfWork unitOfWork)
    {
        _friendRequestRepository = friendRequestRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(SendFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var fr = request.FriendRequest;
        fr.Status = "Status";
        fr.Date = DateTime.Now;
        _friendRequestRepository.Add(fr);
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
