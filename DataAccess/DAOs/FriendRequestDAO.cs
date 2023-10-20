using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    internal class FriendRequestDAO
    {
        //using singleton to access db by one instance variable
        private static FriendRequestDAO instance = null;
        private static readonly object instanceLock = new object();
        private FriendRequestDAO() { }
        public static FriendRequestDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new FriendRequestDAO();
                    }
                    return instance;
                }
            }
        }


        public int AddFriendRequest(FriendRequest friendRequest)
        {
            using var dbContext = new ChatApplicationContext();
            IFriendRepository friendRepository = new FriendRepository();
            //Check 2-side
            var friendList = friendRepository.GetFriendsByUserId(friendRequest.SenderId);
            var friend = friendList.SingleOrDefault(x => x.FriendId == friendRequest.ReceiverId
            || x.UserId == friendRequest.ReceiverId
            );
            if (friend != null)
            {
                throw new Exception("They are already friend! Aborting friend request");
            }

            dbContext.FriendRequests.Add(friendRequest);
            return dbContext.SaveChanges();
        }

        public List<FriendRequest> GetFriendRequestsByReceiverId(int receiverId)
        {
            using var dbContext = new ChatApplicationContext();
            return dbContext.FriendRequests
                .Include(fr => fr.Sender)
                .Where(fr => fr.ReceiverId == receiverId)
                .ToList();
        }

        public List<FriendRequest> GetFriendRequestsBySenderId(int senderId)
        {
            using var dbContext = new ChatApplicationContext();
            return dbContext.FriendRequests.Where(fr => fr.SenderId == senderId).ToList();
        }

        public int UpdateFriendRequestStatus(int senderId, int receiverId, string status)
        {
            using var dbContext = new ChatApplicationContext();
            FriendRequest friendRequestToUpdate = dbContext.FriendRequests.FirstOrDefault(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId);
            if (friendRequestToUpdate != null)
            {
                friendRequestToUpdate.Status = status;
                return dbContext.SaveChanges();
            }
            return 0;
        }

        public int RemoveFriendRequest(int senderId, int receiverId)
        {
            using var dbContext = new ChatApplicationContext();
            FriendRequest friendRequestToDelete = dbContext.FriendRequests.FirstOrDefault(fr => fr.SenderId == senderId && fr.ReceiverId == receiverId);
            if (friendRequestToDelete != null)
            {
                dbContext.FriendRequests.Remove(friendRequestToDelete);
                return dbContext.SaveChanges();
            }
            return 0;
        }
    }
}
