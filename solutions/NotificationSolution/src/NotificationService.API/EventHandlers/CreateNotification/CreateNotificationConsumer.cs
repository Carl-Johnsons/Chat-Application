using Azure;
using Contract.Common;
using Contract.Event.ConversationEvent;
using Contract.Event.NotificationEvent;
using MassTransit;
using NotificationService.Application.Notifications.Commands;

namespace NotificationService.API.EventHandlers.CreateNotification;

[QueueName("create-notification-event-queue", "create-notification-event")]
public class CreateNotificationConsumer : IConsumer<CreateNotificationEvent>
{
    private readonly ISender _sender;

    public CreateNotificationConsumer(ISender sender)
    {
        _sender = sender;
    }

    public async Task Consume(ConsumeContext<CreateNotificationEvent> context)
    {
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("notification-service consume the message-queue");

        var command = new CreateNotificationCommand
        {
            ActorIds = context.Message.ActorIds,
            OwnerId = context.Message.OwnerId,
            CategoryCode = context.Message.CategoryCode,
            ActionCode = context.Message.ActionCode,
            Url = context.Message.Url,
        };

        var result = await _sender.Send(command);
        result.ThrowIfFailure();

        await Console.Out.WriteLineAsync("notification-service done the request");
        await Console.Out.WriteLineAsync("======================================");
    }
}
