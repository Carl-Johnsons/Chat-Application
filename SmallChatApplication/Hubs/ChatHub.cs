using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;
using System.Collections.Concurrent;

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
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            Console.WriteLine("Disconnected");
            return base.OnDisconnectedAsync(exception);
        }

        //Send
        public async Task SendMessageToGroup(User user, string message)
        {
            //await Console.Out.WriteLineAsync("I'm in SendMessageToGroup");
            //await Clients.Group(user.Room).SendAsync("ReceiveMessage", user.Name, message);
        }
        public async Task SendMessage(string user, string message)
        {
            await Console.Out.WriteLineAsync("I'm in SendMessage");
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }

        public async Task SendFriendRequest(FriendRequest friendRequest)
        {
            var receiverConnectionId = UserConnectionMap.SingleOrDefault(key => key.Value.UserId == friendRequest.ReceiverId).Key;

            // If the receiver didn't online, simply do nothing
            if (receiverConnectionId == null)
            {
                return;
            }
            string receiverName = UserConnectionMap[receiverConnectionId].Name;
            await Clients.Client(receiverConnectionId).SendAsync("ReceiveFriendRequest");
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
