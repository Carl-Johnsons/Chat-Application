using ConversationService.Infrastructure.Repositories;
using MediatR;
using ConversationService.Domain.Entities;

namespace ConversationService.Application.Users.Queries.GetFriendRequestsByReceiverId;

public class GetFriendRequestsBySenderIdQueryHandler : IRequestHandler<GetFriendRequestsByReceiverIdQuery, List<FriendRequest>>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task<List<FriendRequest>> Handle(GetFriendRequestsByReceiverIdQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_friendRequestRepository.GetByReceiverId(request.ReceiverId));
    }
}
