using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using DataAccess.Repositories;
using BussinessObject.Constants;
using ChatService.Models;

namespace ChatService.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        private static GroupUserRepository _groupUserRepository;
        //Use the dictionary to map the userId and userConnectionId
        private static readonly ConcurrentDictionary<string, int> UserConnectionMap = new ConcurrentDictionary<string, int>();

        public ChatHub()
        {
            _groupUserRepository = new GroupUserRepository();
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

                var groupIdList = _groupUserRepository.GetByUserId(userId).Select(g => g.GroupId).ToList();
                //Join group
                foreach (var groupId in groupIdList)
                {
                    await Console.Out.WriteLineAsync($"{userId} joining group {groupId}");
                    await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
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
        public async Task SendIndividualMessage(IndividualMessage individualMessage)
        {
            try
            {
                // Have to get list because the 1 person can join on 2 different tab on browser
                // So the connectionId may differnect but still 1 userId
                var receiverConnectionIdList = UserConnectionMap.
                        Where(pair => pair.Value == individualMessage.UserReceiverId)
                        .Select(pair => pair.Key)
                        .ToList();

                // If the receiver didn't online, simply do nothing
                if (receiverConnectionIdList.Count <= 0)
                {
                    return;
                }
                // Create the settings with CamelCasePropertyNamesContractResolver
                // if not setting like this, the attribute will be Pascal case will break the data in client-side
                var settings = new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                };
                string json = JsonConvert.SerializeObject(individualMessage, settings);
                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    // Serialize your object to JSON with camel case attribute names
                    await Clients.Client(receiverConnectionId).ReceiveIndividualMessage(json);
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync(ex.Message);
            }
        }
        public async Task SendGroupMessage(GroupMessage groupMessage)
        {
            try
            {
                await Console.Out.WriteLineAsync($"Sending message to group {groupMessage.GroupReceiverId}");
                await Clients.OthersInGroup(groupMessage.GroupReceiverId.ToString())
                            .ReceiveGroupMessage(groupMessage);
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
            // Have to make all attribute lowercase before sending data
            var settings = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            string json = JsonConvert.SerializeObject(friendRequest, settings);
            foreach (var receiverConnectionId in receiverConnectionIdList)
            {
                await Clients.Client(receiverConnectionId).ReceiveFriendRequest(json);
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
        public async Task NotifyUserTyping(SenderReceiverArrayModel model)
        {
            // Notify a list of user because they might have open mulit tab in browsers
            if (model.Type == "Individual")
            {
                var receiverConnectionIdList = UserConnectionMap.
                                                Where(pair => pair.Value == model.ReceiverId)
                                                .Select(pair => pair.Key)
                                                .ToList();
                // If the receiver didn't online, simply do nothing
                if (receiverConnectionIdList.Count <= 0)
                {
                    return;
                }
                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    await Clients.Client(receiverConnectionId).ReceiveNotifyUserTyping(model);
                }
                return;
            }
            if (model.Type == "Group")
            {
                await Clients.OthersInGroup(model.ReceiverId.ToString()).ReceiveNotifyUserTyping(model);
            }

        }
        public async Task DisableNotifyUserTyping(SenderReceiverArrayModel model)
        {
            if (model.Type == "Individual")
            {
                // Notify a list of user because they might have open mulit tab in browsers
                var receiverConnectionIdList = UserConnectionMap.
                    Where(pair => pair.Value == model.ReceiverId)
                    .Select(pair => pair.Key)
                    .ToList();

                // If the receiver didn't online, simply do nothing

                if (receiverConnectionIdList.Count <= 0)
                {
                    return;
                }
                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    await Clients.Client(receiverConnectionId).ReceiveDisableNotifyUserTyping();
                }
                return;
            }
            if (model.Type == "Group")
            {
                await Clients.OthersInGroup(model.ReceiverId.ToString()).ReceiveDisableNotifyUserTyping();
            }
        }
        public async Task JoinGroup(List<int> groupIdList)
        {
            foreach (var groupId in groupIdList)
            {
                await Console.Out.WriteLineAsync($"{UserConnectionMap[Context.ConnectionId]} joining group {groupId}");
                await Groups.AddToGroupAsync(Context.ConnectionId, groupId.ToString());
            }

            //Users userConnection = new Users()
            //{
            //    Name = Name,
            //    Room = Room
            //};

            //await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            //await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", chat_bot,
            //      $"User {userConnection.Name} has joined!!");
            //Console.WriteLine($"{Name} has joined {Room}");

            //// Only the current user see
            //await Clients.Client(Context.ConnectionId).SendAsync("ReceiveMessage", chat_bot,
            //        "Welcome to the chat room!");
        }
        public async Task LeaveGroup(int groupId)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
        }
    }

}
