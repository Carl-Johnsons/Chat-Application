using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;
using System.Collections.Concurrent;
using DataAccess.Repositories;
using ChatService.Models;
using DataAccess.Repositories.Interfaces;

namespace ChatService.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private IConversationUsersRepository _conversationUsersRepository;
        //Use the dictionary to map the userId and userConnectionId
        private static readonly ConcurrentDictionary<string, int> UserConnectionMap = new ConcurrentDictionary<string, int>();

        public ChatHub()
        {
            _conversationUsersRepository = new ConversationUsersRepository();
        }
        public override async Task OnConnectedAsync()
        {
            var cancellationTokenSource = new CancellationTokenSource();
            try
            {
                // The url would be like "https://yourhubURL:port?userId=???"
                var userId = int.Parse(Context.GetHttpContext()?.Request?.Query["userId"]);
                if (userId.Equals(null))
                {
                    throw new Exception("user id is null abort map userId to the user map");
                }

                UserConnectionMap[Context.ConnectionId] = userId;
                await Console.Out.WriteLineAsync($"Map user complete with {Context.ConnectionId} and {userId}");
                Console.WriteLine(userId + " Connected");
                var conversationUserList = _conversationUsersRepository.GetByUserId(userId);
                //Join group
                foreach (var cu in conversationUserList)
                {
                    await Console.Out.WriteLineAsync($"{userId} joining conversation {cu.ConversationId}");
                    await Groups.AddToGroupAsync(Context.ConnectionId, cu.ConversationId.ToString());
                }

                foreach (var key in UserConnectionMap.Keys)
                {
                    Console.WriteLine($"{key}: {UserConnectionMap[key]}");
                }
            }
            catch (Exception ex)
            {
                cancellationTokenSource.Cancel();
                cancellationTokenSource.Dispose();
                Console.WriteLine($"Error: {ex.Message}");
            }
            await Console.Out.WriteLineAsync("============================");
            var userIdOnlineList = UserConnectionMap.Select(uc => uc.Value);
            await Clients.All.Connected(userIdOnlineList);
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Console.Out.WriteLineAsync("Disconnected");
            if (UserConnectionMap.TryRemove(Context.ConnectionId, out int userDisconnectedId))
            {
                Console.WriteLine($"Connection {Context.ConnectionId} disconnected and removed from UserConnectionMap.");
                await Clients.All.Disconnected(userDisconnectedId);
            }
            else
            {
                Console.WriteLine($"Connection {Context.ConnectionId} disconnected, but it was not found in UserConnectionMap.");
            }
            await Console.Out.WriteLineAsync("============================");
            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendMessage(Message message)
        {
            try
            {
                await Clients.OthersInGroup(message.ConversationId.ToString()).ReceiveMessage(message);
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
        }
        public async Task SendFriendRequest(FriendRequest friendRequest)
        {
            // Have to get list because the 1 person can join on 2 different tab on browser
            // So the connectionId may differnect but still 1 userId
            var receiverConnectionIdList = UserConnectionMap.
                Where(pair => pair.Value == friendRequest.ReceiverId)
                .Select(pair => pair.Key)
                .ToList();

            // If the receiver didn't online, simply do nothing
            if (receiverConnectionIdList.Count <= 0)
            {
                return;
            }

            foreach (var receiverConnectionId in receiverConnectionIdList)
            {
                await Clients.Client(receiverConnectionId).ReceiveFriendRequest(friendRequest);
            }
        }
        public async Task SendAcceptFriendRequest(Friend friend)
        {
            // Notify a list of user because they might have open mulit tab in browsers
            // UserId now is the senderId who accept the friend request,
            // so in other to notify other user use friendId instead
            var senderConnectionIdList = UserConnectionMap.
                Where(pair => pair.Value == friend.FriendId)
                .Select(pair => pair.Key)
                .ToList();

            // If the receiver didn't online, simply do nothing
            if (senderConnectionIdList.Count <= 0)
            {
                return;
            }
            foreach (var senderConnectionId in senderConnectionIdList)
            {
                await Clients.Client(senderConnectionId).ReceiveAcceptFriendRequest(friend);
            }
        }
        public async Task JoinConversation(int memberId, int conversationId)
        {
            var memberConnectionId = UserConnectionMap
                                    .Where(pair => pair.Value == memberId)
                                    .Select(pair => pair.Key)
                                    .SingleOrDefault();
            if (memberConnectionId == null)
            {
                return;
            }
            await Groups.AddToGroupAsync(memberConnectionId, conversationId.ToString());
            await Clients.OthersInGroup(conversationId.ToString()).ReceiveJoinConversation(conversationId);
        }
        public async Task NotifyUserTyping(SenderConversationModel model)
        {
            // Notify a list of user because they might have open mulit tab in browsers

            await Clients.OthersInGroup(model.ConversationId.ToString()).ReceiveNotifyUserTyping(model);
        }
        public async Task DisableNotifyUserTyping(SenderConversationModel model)
        {
            await Clients.OthersInGroup(model.ConversationId.ToString()).ReceiveDisableNotifyUserTyping();
        }
        public async Task LeaveGroup(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }
    }

}
