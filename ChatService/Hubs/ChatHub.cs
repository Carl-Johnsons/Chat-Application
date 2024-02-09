using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ChatService.Hubs
{
    public class ChatHub : Hub
    {
        //Use the dictionary to map the userId and userConnectionId
        private static readonly ConcurrentDictionary<string, int> UserConnectionMap = new ConcurrentDictionary<string, int>();

        public ChatHub()
        {
        }
        public override async Task OnConnectedAsync()
        {
            // The url would be like "https://yourhubURL:port?userId=???"
            var userId = Context.GetHttpContext()?.Request?.Query["userId"];
            try
            {
                if (userId.Equals(null))
                {
                    throw new Exception("user id is null abort map userId to the user map");
                }

                UserConnectionMap[Context.ConnectionId] = int.Parse(userId);
                Console.Out.WriteLineAsync($"Map user complete with {Context.ConnectionId} and {userId}");
                Console.WriteLine(userId + " Connected");

                Console.WriteLine("In MapUserData");
                foreach (var key in UserConnectionMap.Keys)
                {
                    Console.WriteLine($"{key}: {UserConnectionMap[key]}");
                }

            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            Console.Out.WriteLineAsync("============================");
            await Clients.All.SendAsync("Connected");
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            await Console.Out.WriteLineAsync("Disconnected");
            if (UserConnectionMap.TryRemove(Context.ConnectionId, out _))
            {
                Console.WriteLine($"Connection {Context.ConnectionId} disconnected and removed from UserConnectionMap.");
            }
            else
            {
                Console.WriteLine($"Connection {Context.ConnectionId} disconnected, but it was not found in UserConnectionMap.");
            }
            await Console.Out.WriteLineAsync("============================");
            await Clients.All.SendAsync("Disconnected");
            await base.OnDisconnectedAsync(exception);
        }
        public async Task SendIndividualMessage(IndividualMessage individualMessage)
        {
            try
            {
                await Console.Out.WriteLineAsync("Sending message: " + individualMessage.Message.Content);
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
                    await Console.Out.WriteLineAsync(receiverConnectionId);
                    // Serialize your object to JSON with camel case attribute names
                    await Clients.Client(receiverConnectionId).SendAsync("ReceiveIndividualMessage", json);
                    //await Clients.All.SendAsync("ReceiveIndividualMessage", json);
                }
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
                await Clients.Client(receiverConnectionId).SendAsync("ReceiveFriendRequest", json);
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
                await Clients.Client(senderConnectionId).SendAsync("ReceiveAcceptFriendRequest", friend);
            }
        }
        public async Task NotifyUserTyping(SenderReceiverArrayModel model)
        {
            List<int> ReceiverIdList = model.ReceiverIdList;
            for (int i = 0; i < ReceiverIdList.Count; i++)
            {
                // Notify a list of user because they might have open mulit tab in browsers
                var receiverConnectionIdList = UserConnectionMap.
                    Where(pair => pair.Value == ReceiverIdList[i])
                    .Select(pair => pair.Key)
                    .ToList();
                // If the receiver didn't online, simply do nothing
                if (receiverConnectionIdList.Count <= 0)
                {
                    return;
                }
                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    await Clients.Client(receiverConnectionId).SendAsync("ReceiveNotifyUserTyping", model);
                }
            }
        }
        public async Task DisableNotifyUserTyping(SenderReceiverArrayModel model)
        {
            List<int> ReceiverIdList = model.ReceiverIdList;
            for (int i = 0; i < ReceiverIdList.Count; i++)
            {
                // Notify a list of user because they might have open mulit tab in browsers
                var receiverConnectionIdList = UserConnectionMap.
                    Where(pair => pair.Value == ReceiverIdList[i])
                    .Select(pair => pair.Key)
                    .ToList();

                // If the receiver didn't online, simply do nothing

                if (receiverConnectionIdList.Count <= 0)
                {
                    return;
                }
                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    await Clients.Client(receiverConnectionId).SendAsync("ReceiveDisableNotifyUserTyping", model);
                }
            }
        }
        public async Task JoinRoom(string Name, string Room)
        {
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
    }
    public class SenderReceiverArrayModel
    {
        [Required]
        [JsonPropertyName("senderIdList")]
        public List<int> SenderIdList { get; set; }

        [Required]
        [JsonPropertyName("receiverIdList")]
        public List<int> ReceiverIdList { get; set; }
    }

}
