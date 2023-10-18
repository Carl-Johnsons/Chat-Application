using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    internal class FriendRequestDAO
    {
        private readonly YourDbContext dbContext; // Replace 'YourDbContext' with your actual DbContext class name

        public FriendRequestDAO(YourDbContext dbContext) // Replace 'YourDbContext'
        {
            this.dbContext = dbContext;
        }

        public void AddFriendRequest(FriendRequest friendRequest)
        {
            dbContext.FriendRequests.Add(friendRequest);
            dbContext.SaveChanges();
        }

        public List<FriendRequest> GetFriendRequestsByReceiverId(int receiverId)
        {
            return dbContext.FriendRequests.Where(fr => fr.ReceiverId == receiverId).ToList();
        }

        public List<FriendRequest> GetFriendRequestsBySenderId(int senderId)
        {
            return dbContext.FriendRequests.Where(fr => fr.SenderId == senderId).ToList();
        }

        public void UpdateFriendRequestStatus(int senderId, int receiverId, string status)
        {
            FriendRequest friendRequestToUpdate = dbContext.FriendRequests.FirstOrDefault(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId);
            if (friendRequestToUpdate != null)
            {
                friendRequestToUpdate.Status = status;
                dbContext.SaveChanges();
            }
        }

        public void DeleteFriendRequest(int senderId, int receiverId)
        {
            FriendRequest friendRequestToDelete = dbContext.FriendRequests.FirstOrDefault(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId);
            if (friendRequestToDelete != null)
            {
                dbContext.FriendRequests.Remove(friendRequestToDelete);
                dbContext.SaveChanges();
            }
        }
    }
}
