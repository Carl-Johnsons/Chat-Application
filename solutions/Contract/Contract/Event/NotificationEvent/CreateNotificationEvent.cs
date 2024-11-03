using MassTransit;
using System.ComponentModel.DataAnnotations;

namespace Contract.Event.NotificationEvent;

[EntityName("create-notification-event")]
public class CreateNotificationEvent
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
