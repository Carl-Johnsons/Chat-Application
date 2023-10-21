using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class FriendRequestRepository : IFriendRequestRepository
    {
        public int AddFriendRequest(FriendRequest friendRequest) => FriendRequestDAO.Instance.AddFriendRequest(friendRequest);
        public List<FriendRequest> GetFriendRequestsByReceiverId(int receiverId) => FriendRequestDAO.Instance.GetFriendRequestsByReceiverId(receiverId);
        public List<FriendRequest> GetFriendRequestsBySenderId(int senderId) => FriendRequestDAO.Instance.GetFriendRequestsBySenderId(senderId);
        public int UpdateFriendRequestStatus(int senderId, int receiverId, string status) => FriendRequestDAO.Instance.UpdateFriendRequestStatus(senderId, receiverId, status);
        public int RemoveFriendRequest(int senderId, int receiverId) => FriendRequestDAO.Instance.RemoveFriendRequest(senderId, receiverId);
    }
}
