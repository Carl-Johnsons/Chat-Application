using MassTransit;

namespace Contract.Event.UserEvent;

[EntityName("user-blocked-event")]
public record UserBlockedEvent
{
    public Guid UserId { get; set; }
    public Guid BlockUserId { get; set; }
}
