using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    internal class FriendRequestDAO
    {
        //using singleton to access db by one instance variable
        private static FriendRequestDAO? instance = null;
        private static readonly object instanceLock = new();
        private FriendRequestDAO() { }
        public static FriendRequestDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new FriendRequestDAO();
                    return instance;
                }
            }
        }

        private readonly ChatApplicationContext _context = new();
        private readonly IFriendRepository _friendRepository = new FriendRepository();
        public int Add(FriendRequest friendRequest)
        {
            //Check 2-side
            var friendList = _friendRepository.GetByUserId(friendRequest.SenderId);
            var friend = friendList
                .SingleOrDefault(x => x.FriendId == friendRequest.ReceiverId
                                || x.UserId == friendRequest.ReceiverId);
            if (friend != null)
            {
                throw new Exception("They are already friend! Aborting friend request");
            }

            _context.FriendRequests.Add(friendRequest);
            return _context.SaveChanges();
        }
        public List<FriendRequest> GetByReceiverId(int? receiverId)
        {
            _ = receiverId ?? throw new Exception("Receiver Id is null");
            return _context.FriendRequests
                .Include(fr => fr.Sender)
                .Where(fr => fr.ReceiverId == receiverId)
                .ToList();
        }
        public List<FriendRequest> GetBySenderId(int? senderId)
        {
            _ = senderId ?? throw new Exception("Sender Id is null");
            return _context.FriendRequests
                .Include(fr => fr.Receiver)
                .Where(fr => fr.SenderId == senderId)
                .ToList();
        }
        public FriendRequest? GetBySenderIdAndReceiverId(int? senderId, int? receiverId)
        {
            _ = senderId ?? throw new Exception("Sender Id is null");
            _ = receiverId ?? throw new Exception("Receiver Id is null");
            return _context.FriendRequests
                    .FirstOrDefault(fr => fr.SenderId == senderId
                                    && fr.ReceiverId == receiverId);
        }
        public int UpdateStatus(int? senderId, int? receiverId, string? status)
        {
            var fr = GetBySenderIdAndReceiverId(senderId, receiverId) ?? throw new Exception("Friend request not found! Abort updating status operation!");
            fr.Status = status;
            _context.FriendRequests.Update(fr);
            return _context.SaveChanges();
        }
        public int Delete(int senderId, int receiverId)
        {
            var fr = GetBySenderIdAndReceiverId(senderId, receiverId) ?? throw new Exception("Friend request not found! Abort deleting operation!");
            _context.FriendRequests.Remove(fr);
            return _context.SaveChanges();
        }
    }
}
