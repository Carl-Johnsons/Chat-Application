namespace ConversationService.Domain.Interfaces;

public interface IFriendRequestRepository : IBaseRepository<FriendRequest>
{
    Task<List<FriendRequest>> GetByReceiverIdAsync(int receiverId);
    Task<List<FriendRequest>> GetBySenderIdAsync(int senderId);
    Task<FriendRequest?> GetBySenderIdAndReceiverIdAsync(int? senderId, int? receiverId);
}