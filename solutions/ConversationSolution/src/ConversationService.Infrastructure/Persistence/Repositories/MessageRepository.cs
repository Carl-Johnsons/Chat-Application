namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class MessageRepository : BaseRepository<Message>
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }

    public List<Message> GetAsync(int? conversationId, int skip)
    {
        _ = conversationId ?? throw new Exception("Conversation id is null");
        var messages = _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Skip(skip * MessageConstant.LIMIT)
            .Take(MessageConstant.LIMIT)
            .OrderBy(m => m.Id)
            .ToList();
        return messages;
    }
    public Message? GetLastAsync(int? conversationId)
    {
        _ = conversationId ?? throw new Exception("Conversation id is null");
        var message = _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Take(1)
            .SingleOrDefault();
        return message;
    }
}
