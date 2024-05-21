using MassTransit;

namespace Contract.Event.FriendEvent;

[EntityName("friend-created-event")]
public record FriendCreatedEvent
{
    public Guid UserId { get; set; }
    public Guid OtherUserId { get; set; }
}
