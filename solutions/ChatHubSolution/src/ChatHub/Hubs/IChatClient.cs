using ChatHub.DTOs;
using ChatHub.Models;

namespace ChatHub.Hubs;

public interface IChatClient
{
    Task Connected(IEnumerable<Guid>? userIdOnlineList);
    Task Disconnected(Guid userDisconnectedId);
    Task ReceiveMessage(MessageDTO messageDTO);
    //Task ReceiveFriendRequest(FriendRequest fr);
    //Task ReceiveAcceptFriendRequest(Friend f);
    Task ReceiveJoinConversation(Guid conversationId);
    Task ReceiveNotifyUserTyping(SenderConversationModel model);
    Task ReceiveDisableNotifyUserTyping();
}
