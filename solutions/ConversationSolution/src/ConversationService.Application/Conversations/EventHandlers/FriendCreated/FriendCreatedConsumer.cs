using Contract.Event.FriendEvent;
using ConversationService.Application.Conversations.Commands;
using MassTransit;

namespace ConversationService.Application.Conversations.EventHandlers.FriendCreated;

public sealed class FriendCreatedConsumer : IConsumer<FriendCreatedEvent>
{
    private readonly ISender _sender;

    public FriendCreatedConsumer(ISender sender)
    {
        _sender = sender;
    }

    public async Task Consume(ConsumeContext<FriendCreatedEvent> context)
    {
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("Conversation-service consume the message-queue");
        var userId = context.Message.UserId;
        var otherUserId = context.Message.OtherUserId;

        var command = new CreateIndividualConversationCommand
        {
            CurrentUserId = userId,
            OtherUserId = otherUserId,
        };

        await _sender.Send(command);
        await Console.Out.WriteLineAsync("Conversation-service done the request");
        await Console.Out.WriteLineAsync("======================================");

    }
}