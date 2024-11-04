
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using NotificationService.Domain.Errors;
using System.ComponentModel.DataAnnotations;

namespace NotificationService.Application.Notifications.Commands;

public sealed record CreateNotificationCommand : IRequest<Result<Notification?>>
{
    [Required]
    public string CategoryCode { get; set; } = null!;
    [Required]
    public string ActionCode { get; set; } = null!;
    public Guid[] ActorIds { get; init; } = [];
    public Guid OwnerId { get; set; }
    public string Url { get; set; } = null!;
    public Guid ReceiverId { get; set; }
}

public class CreateNotificationCommandHandler : IRequestHandler<CreateNotificationCommand, Result<Notification?>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateNotificationCommandHandler(IUnitOfWork unitOfWork, IApplicationDbContext context)
    {
        _unitOfWork = unitOfWork;
        _context = context;
    }

    public async Task<Result<Notification?>> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
    {
        var category = await _context.NotificationCategories
                                 .Where(nc => nc.Code == request.CategoryCode)
                                 .SingleOrDefaultAsync();
        if (category == null)
        {
            return Result<Notification>.Failure(NotificationErrors.CategoryNotFound);
        }

        var action = await _context.NotificationActions
                                     .Where(na => na.Code == request.ActionCode)
                                     .SingleOrDefaultAsync();

        if (action == null)
        {
            return Result<Notification>.Failure(NotificationErrors.ActionNotFound);
        }


        var formattedActorIds = JsonConvert.SerializeObject(request.ActorIds);

        var notification = new Notification
        {
            ActionId = action.Id,
            CategoryId = category.Id,
            Url = request.Url,
            OwnerId = request.OwnerId,
            ActorIds = formattedActorIds,
            ReceiverId = request.ReceiverId,
        };

        _context.Notifications.Add(notification);
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result<Notification?>.Success(notification);
    }
}
