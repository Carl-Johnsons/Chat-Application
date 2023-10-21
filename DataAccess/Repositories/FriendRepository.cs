using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.Repositories
{
    public class FriendRepository : IFriendRepository
    {

        public int AddFriend(Friend friend) => FriendDAO.Instance.AddFriend(friend);
        public List<Friend> GetFriendsByUserId(int userId) => FriendDAO.Instance.GetFriendsByUserId(userId);

        public List<Friend> GetFriendsByFriendId(int friendId) => FriendDAO.Instance.GetFriendsByFriendId(friendId);
        public int RemoveFriend(int userId, int friendId) => FriendDAO.Instance.RemoveFriend(userId, friendId);
    }
}
