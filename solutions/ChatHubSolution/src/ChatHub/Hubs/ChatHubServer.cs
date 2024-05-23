using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Http.Extensions;
using ChatHub.Models;
using ChatHub.DTOs;
using Newtonsoft.Json;
using MassTransit;
using Contract.Event.ConversationEvent;

namespace ChatHub.Hubs;

public class ChatHubServer : Hub<IChatClient>
{
    //Use the dictionary to map the userId and userConnectionId
    private static readonly ConcurrentDictionary<string, Guid> UserConnectionMap = new();
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IPublishEndpoint _publishEndpoint;
    private readonly IBus _bus;

    public ChatHubServer(IHttpContextAccessor httpContextAccessor, IPublishEndpoint publishEndpoint, IBus bus)
    {
        _httpContextAccessor = httpContextAccessor;
        _publishEndpoint = publishEndpoint;
        _bus = bus;
    }

    // The url would be like "https://yourhubURL:port?userId=???"
    public override async Task OnConnectedAsync()
    {
        var userId = _httpContextAccessor.HttpContext.Request.Query["userId"].ToString();
        try
        {
            if (userId == null)
            {
                var RequestUrl = Context.GetHttpContext()?.Request.GetDisplayUrl() ?? "Unknown";
                await Console.Out.WriteLineAsync($"Service with url {RequestUrl} has connected to signalR sucessfully!");
            }
            else
            {
                await Console.Out.WriteLineAsync($"user with id {userId} has connected to signalR sucessfully!");
                await ConnectWithUserIdAsync(Guid.Parse(userId));
            }

        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync($"Error: {ex.Message}");
        }

        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        await Console.Out.WriteLineAsync($"Disconnecting from signalR!");
        if (UserConnectionMap.TryRemove(Context.ConnectionId, out Guid userDisconnectedId))
        {
            await Console.Out.WriteLineAsync($"Connection {Context.ConnectionId} disconnected and removed from UserConnectionMap.");
            await Clients.All.Disconnected(userDisconnectedId);
        }
        else
        {
            await Console.Out.WriteLineAsync($"Connection {Context.ConnectionId} disconnected, but it was not found in UserConnectionMap.");
        }

        await base.OnDisconnectedAsync(exception);
    }
    public async Task SendMessage(MessageDTO messageDTO)
    {
        await Console.Out.WriteLineAsync("sending message to client: " + JsonConvert.SerializeObject(messageDTO));
        try
        {
            await Clients.OthersInGroup(messageDTO.ConversationId.ToString()).ReceiveMessage(messageDTO);
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
        }
    }

    //public async Task SendFriendRequest(FriendRequest friendRequest)
    //{
    //    // Have to get list because the 1 person can join on 2 different tab on browser
    //    // So the connectionId may differnect but still 1 userId
    //    var receiverConnectionIdList = UserConnectionMap.
    //        Where(pair => pair.Value == friendRequest.ReceiverId)
    //        .Select(pair => pair.Key)
    //        .ToList();

    //    // If the receiver didn't online, simply do nothing
    //    if (receiverConnectionIdList.Count <= 0)
    //    {
    //        return;
    //    }

    //    foreach (var receiverConnectionId in receiverConnectionIdList)
    //    {
    //        await Clients.Client(receiverConnectionId).ReceiveFriendRequest(friendRequest);
    //    }
    //}

    //public async Task SendAcceptFriendRequest(Friend friend)
    //{
    //    // Notify a list of user because they might have open mulit tab in browsers
    //    // UserId now is the senderId who accept the friend request,
    //    // so in other to notify other user use friendId instead
    //    var senderConnectionIdList = UserConnectionMap.
    //        Where(pair => pair.Value == friend.FriendId)
    //        .Select(pair => pair.Key)
    //        .ToList();

    //    // If the receiver didn't online, simply do nothing
    //    if (senderConnectionIdList.Count <= 0)
    //    {
    //        return;
    //    }
    //    foreach (var senderConnectionId in senderConnectionIdList)
    //    {
    //        await Clients.Client(senderConnectionId).ReceiveAcceptFriendRequest(friend);
    //    }
    //}
    public async Task JoinConversation(Guid memberId, Guid conversationId)
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
    private async Task ConnectWithUserIdAsync(Guid userId)
    {
        UserConnectionMap[Context.ConnectionId] = userId;
        await Console.Out.WriteLineAsync($"Map user complete with {Context.ConnectionId} and {userId}");
        await Console.Out.WriteLineAsync(userId + " Connected");


        Console.WriteLine("=================Call conversation service by sending message to queue===============");
        var requestClient = _bus.CreateRequestClient<GetConversationByUserIdEvent>();
        var conversationsResponse = await requestClient.GetResponse<ConversationResponse>(new GetConversationByUserIdEvent
        {
            UserId = userId
        });

        Console.WriteLine(JsonConvert.SerializeObject(conversationsResponse.Message.Conversations));
        Console.WriteLine("=================Call conversation service by sending message to queue===============");

        //Join group

        foreach (var c in conversationsResponse.Message.Conversations)
        {
            await Console.Out.WriteLineAsync($"{userId} joining conversation {c.Id}");
            await Groups.AddToGroupAsync(Context.ConnectionId, c.Id.ToString());
        }

        foreach (var key in UserConnectionMap.Keys)
        {
            await Console.Out.WriteLineAsync($"{key}: {UserConnectionMap[key]}");
        }
        var userIdOnlineList = UserConnectionMap.Select(uc => uc.Value);
        await Clients.All.Connected(userIdOnlineList);
    }

}
