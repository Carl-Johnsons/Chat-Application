using ChatHub.DTOs;

namespace ChatHub.Hubs;

public interface IChatClient
{
    Task Connected(IEnumerable<Guid>? userIdOnlineList);
    Task Disconnected(Guid userDisconnectedId);
    Task ReceiveMessage(MessageDTO messageDTO);
    Task ReceiveFriendRequest(FriendRequestDTO fr);
    Task ReceiveAcceptFriendRequest(FriendDTO f);
    Task ReceiveJoinConversation(Guid conversationId);
    Task ReceiveNotifyUserTyping(UserTypingNotificationDTO model);
    Task ReceiveDisableNotifyUserTyping();
}
