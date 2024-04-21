namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class ConversationRepository : BaseRepository<Conversation>
{
    public ConversationRepository(ApplicationDbContext context) : base(context)
    {
    }
}
