using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.User.Queries.GetFriendRequestsByReceiverId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsByReceiverIdQuery, List<FriendRequest>>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task<List<FriendRequest>> Handle(GetFriendRequestsByReceiverIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_friendRequestRepository.GetByReceiverId(request.ReceiverId));
    }
}
