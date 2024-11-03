using Microsoft.EntityFrameworkCore;

namespace NotificationService.Application.Notifications.Queries;

public record GetAllNotificationQuery : IRequest<Result<List<Notification>>>;

public class GetAllNotificationQueryHandler : IRequestHandler<GetAllNotificationQuery, Result<List<Notification>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllNotificationQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<Notification>>> Handle(GetAllNotificationQuery request, CancellationToken cancellationToken)
    {
        var notifications = await _context.Notifications
            .ToListAsync(cancellationToken);

        return Result<List<Notification>>.Success(notifications);
    }
}
