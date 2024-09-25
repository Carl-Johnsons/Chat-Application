

using ConversationService.Domain.Interfaces;

namespace ConversationService.Application.DisabledNotifications.Commands;

public record DeleteDisabledNotificationsCommand : IRequest<Result>
{
    public Guid ConversationId { get; init; }
    public Guid UserId { get; init; }
}
public class DeleteDisabledNotificationsCommandHandler : IRequestHandler<DeleteDisabledNotificationsCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public DeleteDisabledNotificationsCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

       

    public async Task<Result> Handle(DeleteDisabledNotificationsCommand request, CancellationToken cancellationToken)
    {
        var conversation = _context.ConversationUsers
                             .Where(c => c.ConversationId == request.ConversationId && c.UserId == request.UserId)
                             .SingleOrDefault();

        var disabledNotificationConversation = _context.DisabledNotifications
                                    .Where(d => d.ConversationId == request.ConversationId && d.UserId == request.UserId)
                                    .SingleOrDefault();

        if (conversation == null || disabledNotificationConversation == null)
        {
            return Result.Failure(ConversationError.NotFound);
        }

        _context.DisabledNotifications.Remove(disabledNotificationConversation!);
        await _unitOfWork.SaveChangeAsync(cancellationToken);
        return Result.Success();
    }
}

