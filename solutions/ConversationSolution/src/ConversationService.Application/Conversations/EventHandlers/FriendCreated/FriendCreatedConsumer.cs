using Contract.Event.FriendEvent;
using ConversationService.Infrastructure.Persistence;
using MassTransit;

namespace ConversationService.Application.Conversations.EventHandlers.FriendCreated;

public sealed class FriendCreatedConsumer : IConsumer<FriendCreatedEvent>
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public FriendCreatedConsumer(ApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Consume(ConsumeContext<FriendCreatedEvent> context)
    {
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("Conversation-service consume the message-queue");
        var userId = context.Message.UserId;
        var otherUserId = context.Message.OtherUserId;

        var conversation = new Conversation
        {
            Type = CONVERSATION_TYPE_CODE.INDIVIDUAL
        };

        _context.Conversations.Add(conversation);


        ConversationUser cu = new()
        {
            ConversationId = conversation.Id,
            UserId = userId,
            Role = "Member",
        };
        _context.ConversationUsers.Add(cu);

        ConversationUser cou = new()
        {
            ConversationId = conversation.Id,
            UserId = otherUserId,
            Role = "Member",
        };
        _context.ConversationUsers.Add(cou);

        await _unitOfWork.SaveChangeAsync();
        await Console.Out.WriteLineAsync("Conversation-service done the request");
        await Console.Out.WriteLineAsync("======================================");

    }
}