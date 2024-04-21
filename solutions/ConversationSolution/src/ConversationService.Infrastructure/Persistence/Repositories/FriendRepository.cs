namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class FriendRepository : BaseRepository<Friend>
{
    public FriendRepository(ApplicationDbContext context) : base(context)
    {
    }

    public List<Friend> GetByUserId(int userId)
    {
        return [.. _context.Friends
            .Where(f => f.UserId == userId || f.FriendId == userId)
            .Select(f => new Friend
            {
                FriendId = f.FriendId,
                UserId = f.UserId,
                //FriendNavigation = f.UserId == userId ? f.FriendNavigation : f.User
            })];
    }
    public List<Friend> GetByFriendId(int friendId)
    {
        return [.. _context.Friends.Where(f => f.UserId == friendId || f.FriendId == friendId)];
    }
    public Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId)
    {
        return _context.Friends.FirstOrDefault(
              f =>
              f.UserId == userId && f.FriendId == friendId
              || f.UserId == friendId && f.FriendId == userId
              );
    }
    public void Remove(int userId, int friendId)
    {
        Friend? friendToRemove = GetFriendsByUserIdOrFriendId(userId, friendId) ?? throw new Exception("Friend not found! Aborting delete operation");
        _context.Friends.Remove(friendToRemove);
    }
}
