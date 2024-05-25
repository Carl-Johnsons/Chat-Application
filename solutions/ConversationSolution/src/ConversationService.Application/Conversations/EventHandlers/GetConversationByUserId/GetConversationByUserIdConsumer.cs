using Contract.DTOs;
using Contract.Event.ConversationEvent;
using ConversationService.Application.Conversations.Queries;
using MassTransit;

namespace ConversationService.Application.Conversations.EventHandlers.GetConversationByUserId;

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
        var conversations = await _sender.Send(new GetConversationListByUserIdQuery
        {
            UserId = context.Message.UserId,
        });

        List<ConversationResponseDTO> responses = [];
        foreach (var conversation in conversations)
        {
            responses.Add(new ConversationResponseDTO
            {
                Id = conversation.Id,
                Type = conversation.Type,
                CreatedAt = conversation.CreatedAt,
                UpdatedAt = conversation.UpdatedAt,
            });
        }

        await context.RespondAsync(new ConversationResponse
        {
            Conversations = responses
        });
    }
}
