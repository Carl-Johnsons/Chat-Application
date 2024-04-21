namespace ConversationService.Domain.Interfaces;

public interface IFriendRepository : IBaseRepository<Friend>
{
    Task<List<Friend>> GetByFriendIdAsync(int friendId);
    Task<List<Friend>> GetByUserIdAsync(int userId);
    Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId);
}