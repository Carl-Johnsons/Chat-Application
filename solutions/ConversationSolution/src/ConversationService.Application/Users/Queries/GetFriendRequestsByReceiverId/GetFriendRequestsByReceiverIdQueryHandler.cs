
namespace ConversationService.Application.Users.Queries.GetFriendRequestsByReceiverId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsByReceiverIdQuery, List<FriendRequest>>
{
    private readonly IFriendRequestRepository _friendRequestRepository;

    public GetFriendRequestsBySenderIdQueryHandler(IFriendRequestRepository friendRequestRepository)
    {
        _friendRequestRepository = friendRequestRepository;
    }

    public Task<List<FriendRequest>> Handle(GetFriendRequestsByReceiverIdQuery request, CancellationToken cancellationToken)
    {
        return _friendRequestRepository.GetByReceiverIdAsync(request.ReceiverId);
    }
}
