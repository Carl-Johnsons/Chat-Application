namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class ConversationRepository : BaseRepository<Conversation>, IConversationRepository
{
    public ConversationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
