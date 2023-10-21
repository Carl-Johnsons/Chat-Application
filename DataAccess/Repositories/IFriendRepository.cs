using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DataAccess.Repositories
{
    public interface IFriendRepository
    {
        public int AddFriend(Friend friend);
        public List<Friend> GetFriendsByUserId(int userId);
        public List<Friend> GetFriendsByFriendId(int friendId);
        public int RemoveFriend(int userId, int friendId);
    }
}
