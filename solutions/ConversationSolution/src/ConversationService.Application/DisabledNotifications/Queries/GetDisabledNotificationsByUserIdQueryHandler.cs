

using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.DisabledNotifications.Queries;

public record GetDisabledNotificationsByUserIdQuery : IRequest<Result<List<DisabledNotification>>>
{
    public Guid? UserId { get; init; }
}
public class GetDisabledNotificationsByUserIdQueryHandler : IRequestHandler<GetDisabledNotificationsByUserIdQuery, Result<List<DisabledNotification>>>
{
    private readonly IApplicationDbContext _context;

    public GetDisabledNotificationsByUserIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<DisabledNotification>>> Handle(GetDisabledNotificationsByUserIdQuery request, CancellationToken cancellationToken)
    {
        var conversations = await _context.DisabledNotifications
                            .Where(c => c.UserId == request.UserId)
                            .ToListAsync();

        return Result<List<DisabledNotification>>.Success(conversations);
    }


}
