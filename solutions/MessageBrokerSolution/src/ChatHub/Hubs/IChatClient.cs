using ChatService.Models;

namespace ChatService.Hubs
{
    public interface IChatClient
    {
        Task Connected(IEnumerable<int>? userIdOnlineList);
        Task Disconnected(int userDisconnectedId);
        //Task ReceiveMessage(Message message);
        //Task ReceiveFriendRequest(FriendRequest fr);
        //Task ReceiveAcceptFriendRequest(Friend f);
        Task ReceiveJoinConversation(int conversationId);
        Task ReceiveNotifyUserTyping(SenderConversationModel model);
        Task ReceiveDisableNotifyUserTyping();
    }
}
