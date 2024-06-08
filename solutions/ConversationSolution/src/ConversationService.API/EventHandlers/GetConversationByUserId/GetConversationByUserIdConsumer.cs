using Contract.Common;
using Contract.DTOs;
using Contract.Event.ConversationEvent;
using ConversationService.Application.Conversations.Queries;
using MassTransit;
using MediatR;

namespace ConversationService.API.EventHandlers.GetConversationByUserId;

[QueueName("get-conversation-by-user-id-event-queue")]
public sealed class GetConversationByUserIdConsumer : IConsumer<GetConversationByUserIdEvent>
{
    private readonly ISender _sender;

    public GetConversationByUserIdConsumer(ISender sender)
    {
        _sender = sender;
    }

    public async Task Consume(ConsumeContext<GetConversationByUserIdEvent> context)
    {
        await Console.Out.WriteLineAsync("=======================Conversation consuming the message");
        var result = await _sender.Send(new GetConversationListByUserIdQuery
        {
            UserId = context.Message.UserId,
        });

        result.ThrowIfFailure();

        var conversations = result.Value;
        List<ConversationEventResponseDTO> responses = [];
        foreach (var conversation in conversations.Conversations)
        {
            responses.Add(new ConversationEventResponseDTO
            {
                Id = conversation.Id,
                Type = conversation.Type,
                CreatedAt = conversation.CreatedAt,
                UpdatedAt = conversation.UpdatedAt,
            });
        }

        foreach (var conversation in conversations.GroupConversations)
        {
            responses.Add(new ConversationEventResponseDTO
            {
                Id = conversation.Id,
                Type = conversation.Type,
                CreatedAt = conversation.CreatedAt,
                UpdatedAt = conversation.UpdatedAt,
            });
        }


        await context.RespondAsync(new ConversationEventResponse
        {
            Conversations = responses
        });
    }
}
