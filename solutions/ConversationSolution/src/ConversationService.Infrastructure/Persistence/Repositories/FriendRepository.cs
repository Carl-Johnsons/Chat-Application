namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class FriendRepository : BaseRepository<Friend>, IFriendRepository
{
    public FriendRepository(ApplicationDbContext context) : base(context)
    {
    }

    public Task<List<Friend>> GetByUserIdAsync(int userId)
    {
        return _context.Friends
            .Where(f => f.UserId == userId || f.FriendId == userId)
            .Select(f => new Friend
            {
                FriendId = f.FriendId,
                UserId = f.UserId,
                //FriendNavigation = f.UserId == userId ? f.FriendNavigation : f.User
            }).ToListAsync();
    }
    public Task<List<Friend>> GetByFriendIdAsync(int friendId)
    {
        return _context.Friends.Where(f => f.UserId == friendId || f.FriendId == friendId).ToListAsync();
    }
    public Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId)
    {
        return _context.Friends.FirstOrDefault(
              f =>
                  f.UserId == userId && f.FriendId == friendId
                  || f.UserId == friendId && f.FriendId == userId
              );
    }
}
