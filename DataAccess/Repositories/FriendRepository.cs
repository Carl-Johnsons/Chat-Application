using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.Repositories
{
    internal class FriendDAO
    {
        private readonly YourDbContext dbContext; // Replace 'YourDbContext' 

        public FriendDAO(YourDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public void AddFriend(Friend friend)
        {
            dbContext.Friends.Add(friend);
            dbContext.SaveChanges();
        }

        public List<Friend> GetFriendsByUserId(int userId)
        {
            return dbContext.Friends.Where(f => f.UserId == userId).ToList();
        }

        public List<Friend> GetFriendsByFriendId(int friendId)
        {
            return dbContext.Friends.Where(f => f.FriendId == friendId).ToList();
        }

        public void RemoveFriend(int userId, int friendId)
        {
            Friend friendToRemove = dbContext.Friends.FirstOrDefault(f => f.UserId == userId && f.FriendId == friendId);
            if (friendToRemove != null)
            {
                dbContext.Friends.Remove(friendToRemove);
                dbContext.SaveChanges();
            }
        }
    }
}
