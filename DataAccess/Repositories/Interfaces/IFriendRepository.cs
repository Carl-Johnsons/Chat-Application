using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IFriendRepository
    {
        public int Add(Friend friend);
        public List<Friend> GetByUserId(int userId);
        public List<Friend> GetByFriendId(int friendId);
        public Friend? GetFriendsByUserIdOrFriendId(int userId, int friendId);
        public int Delete(int userId, int friendId);
    }
}
