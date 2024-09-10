

namespace ConversationService.Application.DisabledNotifications.Commands;

public record CreateDisabledNotificationsCommand : IRequest<Result>
{
    public Guid ConversationId { get; init; }
    public Guid UserId { get; init; }
}
public class CreateDisabledNotificationsCommandHandler : IRequestHandler<CreateDisabledNotificationsCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateDisabledNotificationsCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }



    public async Task<Result> Handle(CreateDisabledNotificationsCommand request, CancellationToken cancellationToken)
    {
        var conversation = _context.ConversationUsers
                             .Where(c => c.ConversationId == request.ConversationId && c.UserId == request.UserId)
                             .SingleOrDefault();

        var disabled = _context.DisabledNotifications
                            .Where(c => c.ConversationId == request.ConversationId && c.UserId == request.UserId)
                            .SingleOrDefault();

        if (disabled != null)
        {
            return Result.Failure(DisabledNotificationError.AlreadyDisabledNotification);
        }

        if (conversation == null)
        {
            return Result.Failure(ConversationError.NotFound);
        }

        _context.DisabledNotifications.Add(new DisabledNotification
        {
            ConversationId = conversation.ConversationId,
            UserId = conversation.UserId
        });
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}
