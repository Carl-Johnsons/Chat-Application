namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class FriendRequestRepository : BaseRepository<FriendRequest>
{
    public FriendRequestRepository(ApplicationDbContext context) : base(context)
    {
    }

    public List<FriendRequest> GetByReceiverId(int? receiverId)
    {
        _ = receiverId ?? throw new Exception("Receiver Id is null");
        return [.. _context.FriendRequests.Where(fr => fr.ReceiverId == receiverId)];
    }
    public List<FriendRequest> GetBySenderId(int? senderId)
    {
        _ = senderId ?? throw new Exception("Sender Id is null");
        return [.. _context.FriendRequests.Where(fr => fr.SenderId == senderId)];
    }
    public FriendRequest? GetBySenderIdAndReceiverId(int? senderId, int? receiverId)
    {
        _ = senderId ?? throw new Exception("Sender Id is null");
        _ = receiverId ?? throw new Exception("Receiver Id is null");
        return _context.FriendRequests
                .FirstOrDefault(fr => fr.SenderId == senderId
                            && fr.ReceiverId == receiverId);
    }
}
