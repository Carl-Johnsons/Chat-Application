using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;
using System.Collections.Concurrent;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace SmallChatApplication.Hubs
{
    public class ChatHub : Hub
    {
        //Use the dictionary to map the userId and userConnectionId
        private static readonly ConcurrentDictionary<string, User> UserConnectionMap = new ConcurrentDictionary<string, User>();
        private static readonly string BASE_ADDRESS = "https://localhost:7190";

        public ChatHub()
        {
        }

        public async Task MapUserData(User user)
        {
            UserConnectionMap[Context.ConnectionId] = user;
            await Console.Out.WriteLineAsync($"Map user complete with {Context.ConnectionId} and {user.Name}");

            Console.WriteLine("In MapUserData");
            foreach (var key in UserConnectionMap.Keys)
            {
                Console.WriteLine($"{key}:{UserConnectionMap[key].Name}");
            }
        }

        public override Task OnConnectedAsync()
        {
            Console.WriteLine("Connected");
            return base.OnConnectedAsync();
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

            await base.OnDisconnectedAsync(exception);
        }

        //Send
        public async Task SendMessageToGroup(User user, string message)
        {
            //await Console.Out.WriteLineAsync("I'm in SendMessageToGroup");
            //await Clients.Group(user.Room).SendAsync("ReceiveMessage", user.Name, message);
        }
        public async Task SendIndividualMessage(IndividualMessage individualMessage)
        {
            try
            {
                // Have to get list because the 1 person can join on 2 different tab on browser
                // So the connectionId may differnect but still 1 userId
                var receiverConnectionIdList = UserConnectionMap.
                Where(pair => pair.Value.UserId == individualMessage.UserReceiverId)
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

                foreach (var receiverConnectionId in receiverConnectionIdList)
                {
                    await Console.Out.WriteLineAsync(receiverConnectionId);
                    // Serialize your object to JSON with camel case attribute names
                    string json = JsonConvert.SerializeObject(individualMessage, settings);
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
                Where(pair => pair.Value.UserId == friendRequest.ReceiverId)
                .Select(pair => pair.Key)
                .ToList();

            // If the receiver didn't online, simply do nothing
            if (receiverConnectionIdList.Count <= 0)
            {
                return;
            }
            foreach (var receiverConnectionId in receiverConnectionIdList)
            {
                await Clients.Client(receiverConnectionId).SendAsync("ReceiveFriendRequest");
            }
        }

        public async Task SendAcceptFriendRequest(int senderId)
        {
            // Notify a list of user because they might have open mulit tab in browsers
            var senderConnectionIdList = UserConnectionMap.
                Where(pair => pair.Value.UserId == senderId)
                .Select(pair => pair.Key)
                .ToList();

            // If the receiver didn't online, simply do nothing
            if (senderConnectionIdList.Count <= 0)
            {
                return;
            }
            foreach (var senderConnectionId in senderConnectionIdList)
            {
                await Console.Out.WriteLineAsync("====================================");
                await Console.Out.WriteLineAsync("Notify sender:" + senderConnectionId + "| Name: " + UserConnectionMap[senderConnectionId].Name);
                await Clients.Client(senderConnectionId).SendAsync("ReceiveAcceptFriendRequest");
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
}
