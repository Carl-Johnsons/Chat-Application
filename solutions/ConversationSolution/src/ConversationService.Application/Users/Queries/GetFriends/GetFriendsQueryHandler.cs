namespace ConversationService.Application.Users.Queries.GetFriends;

public class GetFriendsQueryHandler : IRequestHandler<GetFriendsQuery, List<Friend>>
{
    private readonly IFriendRepository _friendRepo;

    public GetFriendsQueryHandler(IFriendRepository friendRepo)
    {
        _friendRepo = friendRepo;
    }

    public Task<List<Friend>> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        return _friendRepo.GetByUserIdAsync(userId);
    }
}
