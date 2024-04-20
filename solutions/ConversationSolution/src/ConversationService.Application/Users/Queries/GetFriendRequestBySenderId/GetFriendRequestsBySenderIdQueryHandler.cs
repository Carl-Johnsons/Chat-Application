using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Users.Queries.GetFriendRequestBySenderId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsBySenderIdQuery, List<FriendRequest>>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task<List<FriendRequest>> Handle(GetFriendRequestsBySenderIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_friendRequestRepository.GetByReceiverId(request.SenderId));
    }
}
