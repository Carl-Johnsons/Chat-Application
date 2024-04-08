using ConversationService.Infrastructure.Repositories;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.DeleteFriendRequest;

public class DeleteFriendRequestCommandHandler : IRequestHandler<DeleteFriendRequestCommand>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task Handle(DeleteFriendRequestCommand request, CancellationToken cancellationToken)
    {
        _friendRequestRepository.Delete(request.SenderId, request.UserClaim.UserId);
        return Task.CompletedTask;
    }
}
