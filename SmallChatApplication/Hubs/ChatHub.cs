using Microsoft.AspNetCore.SignalR;
using BussinessObject.Models;

namespace SmallChatApplication.Hubs
{
    public class ChatHub : Hub
    {


        public ChatHub()
        {
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
