using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Users.Queries.GetFriends;

public class GetFriendsQueryHandler : IRequestHandler<GetFriendsQuery, List<Friend>>
{
    private readonly FriendRepository _friendRepo = new();
    public Task<List<Friend>> Handle(GetFriendsQuery request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        var fr = _friendRepo.GetByUserId(userId);
        return Task.FromResult(fr);
    }
}
