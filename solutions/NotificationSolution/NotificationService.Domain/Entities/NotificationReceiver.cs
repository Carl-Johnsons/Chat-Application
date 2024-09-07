
namespace NotificationService.Domain.Entities;

public class NotificationReceiver : BaseEntity
{
    public Guid NotificationId { get; set; }
    public Guid ReceiverId { get; set; }
    public virtual Notification Notification { get; set; } = null!;
}
