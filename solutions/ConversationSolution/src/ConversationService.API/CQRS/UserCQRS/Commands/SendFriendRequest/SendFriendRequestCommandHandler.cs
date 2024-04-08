using ConversationService.Infrastructure.Repositories;
using MediatR;

namespace ConversationService.API.CQRS.UserCQRS.Commands.SendFriendRequest;

public class SendFriendRequestCommandHandler : IRequestHandler<SendFriendRequestCommand>
{
    private readonly FriendRequestRepository _friendRequestRepository = new();
    public Task Handle(SendFriendRequestCommand request, CancellationToken cancellationToken)
    {
        var fr = request.FriendRequest;
        fr.Status = "Status";
        fr.Date = DateTime.Now;
        _friendRequestRepository.Add(fr);
        return Task.CompletedTask;
    }
}
