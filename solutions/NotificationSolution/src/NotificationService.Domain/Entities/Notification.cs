
namespace NotificationService.Domain.Entities;

public class Notification : BaseAuditableEntity
{
    public Guid CategoryId { get; set; }

    public Guid ActionId { get; set; }

    public string ActorIds { get; set; } = null!;

    //the right entity : A shared a post of B
    public Guid OwnerId { get; set; }

    public string Url { get; set; } = null!;
    public Guid ReceiverId { get; set; }
    public bool Read { get; set; } = false;

    public virtual NotificationAction Action { get; set; } = null!;

    public virtual NotificationCategory Category { get; set; } = null!;


}
