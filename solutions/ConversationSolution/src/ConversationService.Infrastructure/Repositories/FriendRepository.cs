using ConversationService.Core.Entities;
using ConversationService.Infrastructure.DAO;


namespace ConversationService.Infrastructure.Repositories;

public class FriendRepository
{
    private readonly FriendDAO Instance = FriendDAO.Instance;
    public int Add(Friend friend) => Instance.Add(friend);
    public List<Friend> GetByUserId(int userId) => Instance.GetByUserId(userId);
    public List<Friend> GetByFriendId(int friendId) => Instance.GetByFriendId(friendId);
    public Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId) => Instance.GetFriendsByUserIdOrFriendId(userId, friendId);
    public int Delete(int userId, int friendId) => Instance.Delete(userId, friendId);
}
