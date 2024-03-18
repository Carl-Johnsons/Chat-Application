using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IFriendRequestRepository
    {
        public int Add(FriendRequest friendRequest);
        public List<FriendRequest> GetByReceiverId(int receiverId);
        public List<FriendRequest> GetBySenderId(int senderId);
        public FriendRequest? GetBySenderIdAndReceiverId(int? senderId, int? receiverId);
        public int UpdateStatus(int senderId, int receiverId, string status);
        public int Delete(int senderId, int receiverId);
    }
}
