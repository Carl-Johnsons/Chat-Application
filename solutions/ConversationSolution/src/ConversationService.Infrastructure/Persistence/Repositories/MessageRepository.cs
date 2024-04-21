namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class MessageRepository : BaseRepository<Message>, IMessageRepository
{
    public MessageRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Task<List<Message>> GetAsync(int conversationId, int skip)
    {
        return _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Skip(skip * MessageConstant.LIMIT)
            .Take(MessageConstant.LIMIT)
            .OrderBy(m => m.Id)
            .ToListAsync();
    }
    public Task<Message?> GetLastAsync(int conversationId)
    {
        return _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Take(1)
            .SingleOrDefaultAsync();
    }
}
