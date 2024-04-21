namespace ConversationService.Application.Users.Queries.GetFriendRequestBySenderId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsBySenderIdQuery, List<FriendRequest>>
{
    private readonly IFriendRequestRepository _friendRequestRepository;

    public GetFriendRequestsBySenderIdQueryHandler(IFriendRequestRepository friendRequestRepository)
    {
        _friendRequestRepository = friendRequestRepository;
    }

    public Task<List<FriendRequest>> Handle(GetFriendRequestsBySenderIdQuery request, CancellationToken cancellationToken)
    {
        return _friendRequestRepository.GetBySenderIdAsync(request.SenderId);
    }
}
