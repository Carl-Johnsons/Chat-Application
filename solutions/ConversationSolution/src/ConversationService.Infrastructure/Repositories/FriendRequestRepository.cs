using ConversationService.Core.Entities;
using ConversationService.Infrastructure.DAO;


namespace ConversationService.Infrastructure.Repositories;

public class FriendRequestRepository 
{
    private readonly FriendRequestDAO Instance = FriendRequestDAO.Instance;
    public int Add(FriendRequest friendRequest) => Instance.Add(friendRequest);
    public List<FriendRequest> GetByReceiverId(int receiverId) => Instance.GetByReceiverId(receiverId);
    public List<FriendRequest> GetBySenderId(int senderId) => Instance.GetBySenderId(senderId);
    public FriendRequest? GetBySenderIdAndReceiverId(int? senderId, int? receiverId) => Instance.GetBySenderIdAndReceiverId(senderId, receiverId);
    public int UpdateStatus(int senderId, int receiverId, string status) => Instance.UpdateStatus(senderId, receiverId, status);
    public int Delete(int senderId, int receiverId) => Instance.Delete(senderId, receiverId);
}
