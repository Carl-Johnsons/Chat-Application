using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IFriendRequestRepository
    {
        public int AddFriendRequest(FriendRequest friendRequest);
        public List<FriendRequest> GetFriendRequestsByReceiverId(int receiverId);
        public List<FriendRequest> GetFriendRequestsBySenderId(int senderId);
        public int UpdateFriendRequestStatus(int senderId, int receiverId, string status);
        public int RemoveFriendRequest(int senderId, int receiverId);
    }
}
