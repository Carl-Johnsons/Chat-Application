using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.User.Queries.GetFriendRequestBySenderId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsBySenderIdQuery, List<FriendRequest>>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task<List<FriendRequest>> Handle(GetFriendRequestsBySenderIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_friendRequestRepository.GetByReceiverId(request.SenderId));
    }
}
