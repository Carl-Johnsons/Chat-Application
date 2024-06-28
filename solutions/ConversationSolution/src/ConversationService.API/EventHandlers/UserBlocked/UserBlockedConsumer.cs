using Contract.Event.UserEvent;
using ConversationService.Application.Conversations.Commands;
using ConversationService.Application.Conversations.Queries;
using MassTransit;
using MediatR;

namespace ConversationService.API.EventHandlers.UserBlocked;

public class UserBlockedConsumer : IConsumer<UserBlockedEvent>
{
    private readonly ISender _sender;

    public UserBlockedConsumer(ISender sender)
    {
        _sender = sender;
    }

    public async Task Consume(ConsumeContext<UserBlockedEvent> context)
    {
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("Conversation-service consume the message-queue: Consumer User Blocked Event");

        var queryResult = await _sender.Send(new GetIndividualConversationByTwoUserIdQuery
        {
            UserId = context.Message.UserId,
            OtherUserId = context.Message.BlockUserId
        });
        
        queryResult.ThrowIfFailure();

        if (queryResult != null) {

            var result = await _sender.Send(new DeleteConversationCommand
            {
                ConversationId = queryResult.Value!.Id
            });
            result.ThrowIfFailure();
        }
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("Conversation-service consume success");

    }
}
