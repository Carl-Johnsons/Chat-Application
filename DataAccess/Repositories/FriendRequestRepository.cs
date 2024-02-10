using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class FriendRequestRepository : IFriendRequestRepository
    {
        private readonly FriendRequestDAO Instance = FriendRequestDAO.Instance;
        public int Add(FriendRequest friendRequest) => Instance.Add(friendRequest);
        public List<FriendRequest> GetByReceiverId(int receiverId) => Instance.GetByReceiverId(receiverId);
        public List<FriendRequest> GetBySenderId(int senderId) => Instance.GetBySenderId(senderId);
        public FriendRequest? GetBySenderIdAndReceiverId(int? senderId, int? receiverId) => Instance.GetBySenderIdAndReceiverId(senderId, receiverId);
        public int UpdateStatus(int senderId, int receiverId, string status) => Instance.UpdateStatus(senderId, receiverId, status);
        public int Delete(int senderId, int receiverId) => Instance.Delete(senderId, receiverId);
    }
}
