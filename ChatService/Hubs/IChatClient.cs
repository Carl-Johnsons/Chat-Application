using BussinessObject.Models;
using ChatService.Models;

namespace ChatService.Hubs
{
    public interface IChatClient
    {
        Task Connected(IEnumerable<int>? userIdOnlineList);
        Task Disconnected(int userDisconnectedId);
        Task ReceiveIndividualMessage(string json);
        Task ReceiveGroupMessage(GroupMessage gm);
        Task ReceiveFriendRequest(string json);
        Task ReceiveAcceptFriendRequest(Friend f);
        Task ReceiveNotifyUserTyping(SenderReceiverArrayModel model);
        Task ReceiveDisableNotifyUserTyping();
    }
}
