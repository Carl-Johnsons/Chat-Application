using ConversationService.Infrastructure.Repositories;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.DeleteFriend;

public class DeleteFriendCommandHandler : IRequestHandler<DeleteFriendCommand>
{
    private readonly FriendRepository _friendRepo = new();
    public Task Handle(DeleteFriendCommand request, CancellationToken cancellationToken)
    {
        _friendRepo.Delete(request.UserClaim.UserId, request.FriendId);
        return Task.CompletedTask;
    }
}
