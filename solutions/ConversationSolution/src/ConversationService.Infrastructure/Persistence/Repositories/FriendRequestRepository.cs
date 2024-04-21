namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class FriendRequestRepository : BaseRepository<FriendRequest>, IFriendRequestRepository
{
    public FriendRequestRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Task<List<FriendRequest>> GetByReceiverIdAsync(int receiverId)
    {
        return _context.FriendRequests.Where(fr => fr.ReceiverId == receiverId).ToListAsync();
    }
    public Task<List<FriendRequest>> GetBySenderIdAsync(int senderId)
    {
        return _context.FriendRequests.Where(fr => fr.SenderId == senderId).ToListAsync();
    }
    public Task<FriendRequest?> GetBySenderIdAndReceiverIdAsync(int? senderId, int? receiverId)
    {
        return _context.FriendRequests
                .SingleOrDefaultAsync(fr => fr.SenderId == senderId
                                    && fr.ReceiverId == receiverId);
    }
}
