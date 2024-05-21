namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class MessageRepository : BaseRepository<Message>, IMessageRepository
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Task<List<Message>> GetAsync(Guid conversationId, int skip)
    {
        return _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Skip(skip * MESSAGE_CONSTANTS.LIMIT)
            .Take(MESSAGE_CONSTANTS.LIMIT)
            .OrderBy(m => m.Id)
            .ToListAsync();
    }
    public Task<Message?> GetLastAsync(Guid conversationId)
    {
        return _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Take(1)
            .SingleOrDefaultAsync();
    }
}
