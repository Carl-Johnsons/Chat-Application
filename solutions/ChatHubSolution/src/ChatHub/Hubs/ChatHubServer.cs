using Microsoft.AspNetCore.SignalR;
using System.Collections.Concurrent;
using Microsoft.AspNetCore.Http.Extensions;
using ChatHub.DTOs;
using Newtonsoft.Json;
using MassTransit;
using Contract.Event.ConversationEvent;
using ChatHub.Models;
using ChatHub.Constants;
using Serilog;

namespace ChatHub.Hubs;

public class ChatHubServer : Hub<IChatClient>
{
    //Use the dictionary to map the userId and userConnectionId
    private static readonly ConcurrentDictionary<string, Guid> UserConnectionMap = new();
    private static readonly ConcurrentDictionary<Guid, List<Guid>> ConversationUsersMap = new();
    private static List<CallOffer> callOffers = new();
    private readonly IHttpContextAccessor _httpContextAccessor;
    // rabbitmq
    private readonly IBus _bus;
    public ChatHubServer(IHttpContextAccessor httpContextAccessor, IBus bus)
    {
        _httpContextAccessor = httpContextAccessor;
        _bus = bus;
        callOffers = new List<CallOffer>();
    }

    // The url would be like "https://yourhubURL:port?userId=abc&access_token=abc"
    public override async Task OnConnectedAsync()
    {
        var userId = _httpContextAccessor.HttpContext?.Request.Query["userId"].ToString();
        try
        {

            if (string.IsNullOrEmpty(userId))
            {
                var RequestUrl = Context.GetHttpContext()?.Request.GetDisplayUrl() ?? "Unknown";
                Log.Information($"Service with url {RequestUrl} has connected to signalR sucessfully!");
            }
            else
            {
                Log.Information($"user with id {userId} has connected to signalR sucessfully!");
                await ConnectWithUserIdAsync(Guid.Parse(userId));
            }

        }
        catch (Exception ex)
        {
            Log.Error($"Error: {ex.Message}");
        }

        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Log.Information($"Disconnecting from signalR!");
        if (UserConnectionMap.TryRemove(Context.ConnectionId, out Guid userDisconnectedId))
        {
            Log.Information($"Connection {Context.ConnectionId} disconnected and removed from UserConnectionMap.");
            await Clients.All.Disconnected(userDisconnectedId);
        }
        else
        {
            Log.Error($"Connection {Context.ConnectionId} disconnected, but it was not found in UserConnectionMap.");
        }

        await base.OnDisconnectedAsync(exception);
    }
    public async Task SendMessage(MessageDTO messageDTO)
    {
        try
        {
            await Clients.Group(messageDTO.ConversationId.ToString()).ReceiveMessage(messageDTO);
        }
        catch (Exception ex)
        {
            Log.Error(ex.Message);
        }
    }

    public async Task SendFriendRequest(FriendRequestDTO friendRequestDTO)
    {
        // Have to get list because the 1 person can join on 2 different tab on browser
        // So the connectionId may differnect but still 1 userId
        var receiverConnectionIdList = UserConnectionMap.
            Where(pair => pair.Value == friendRequestDTO.ReceiverId)
            .Select(pair => pair.Key)
            .ToList();

        // If the receiver didn't online, simply do nothing
        if (receiverConnectionIdList.Count <= 0)
        {
            return;
        }

        foreach (var receiverConnectionId in receiverConnectionIdList)
        {
            await Clients.Client(receiverConnectionId).ReceiveFriendRequest(friendRequestDTO);
        }
    }

    /* 
     * - Notify a list of user because they might have open mulit tab in browsers
     * - UserId now is the friendId who accept the friend request,
     * so in other to notify other user use userId instead
    */
    public async Task SendAcceptFriendRequest(FriendDTO friendDTO)
    {
        var senderConnectionIdList = UserConnectionMap.
            Where(pair => pair.Value == friendDTO.UserId)
            .Select(pair => pair.Key)
            .ToList();

        if (senderConnectionIdList.Count <= 0)
        {
            return;
        }
        foreach (var senderConnectionId in senderConnectionIdList)
        {
            Log.Information("Sending to client");
            await Clients.Client(senderConnectionId).ReceiveAcceptFriendRequest(friendDTO);
        }
    }
    public async Task JoinConversation(JoinConversationDTO joinConversationDTO)
    {
        var memberConnectionIds = UserConnectionMap
                                .Where(pair => joinConversationDTO.MemberIds.Any(mId => mId == pair.Value))
                                .Select(pair => pair.Key)
                                .ToList();
        if (memberConnectionIds.Count == 0)
        {
            return;
        }
        var conversationId = joinConversationDTO.ConversationId;

        foreach (var memberConnectionId in memberConnectionIds)
        {
            await Groups.AddToGroupAsync(memberConnectionId, conversationId.ToString());
        }
        await Clients.OthersInGroup(conversationId.ToString()).ReceiveJoinConversation(conversationId);
    }

    public async Task DisbandConversation(DisbandGroupConversationSignalRDTO dto)
    {
        var memberConnectionIds = UserConnectionMap
                                .Where(pair => dto.MemberIds!.Any(mId => mId == pair.Value))
                                .Select(pair => pair.Key)
                                .ToList();

        if (memberConnectionIds.Count == 0)
        {
            return;
        }
        var conversationId = dto.ConversationId;

        foreach (var memberConnectionId in memberConnectionIds)
        {
            await Groups.AddToGroupAsync(memberConnectionId, conversationId.ToString());
        }
        await Clients.OthersInGroup(conversationId.ToString()).ReceiveDisbandConversation(conversationId);
    }

    public async Task NotifyUserTyping(UserTypingNotificationDTO userTypingNotificationDTO)
    {
        await Clients.OthersInGroup(userTypingNotificationDTO.ConversationId.ToString()).ReceiveNotifyUserTyping(userTypingNotificationDTO);
    }
    public async Task DisableNotifyUserTyping(UserTypingNotificationDTO userTypingNotificationDTO)
    {
        await Clients.OthersInGroup(userTypingNotificationDTO.ConversationId.ToString()).ReceiveDisableNotifyUserTyping();
    }
    public async Task LeaveGroup(int groupId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupId.ToString());
    }
    public async Task DisableUser(DisableAndEnableUserDTO dto)
    {
        var userConnectionIdList = UserConnectionMap.
                                    Where(pair => pair.Value == dto.Id)
                                    .Select(pair => pair.Key)
                                    .ToList();
        if (userConnectionIdList.Count <= 0)
        {
            return;
        }
        foreach (var connectionId in userConnectionIdList)
        {
            await Clients.Client(connectionId).ForcedLogout();
        }
    }

    public async Task DeletePost()
    {
        await Clients.All.DeletePost();
    }

    public async Task ReportPost()
    {
        await Clients.Group(ROLE_BASED_GROUP.ADMIN).ReportPost();
    }


    public async Task SendCallSignal(SendCallSignalDTO sendCallSignalDTO)
    {
        // Forward the signal to the target peer
        var conversationId = sendCallSignalDTO.TargetConversationId;
        var callerId = UserConnectionMap[Context.ConnectionId];
        callOffers.Add(new CallOffer
        {
            CallerId = callerId,
            ConversationId = conversationId
        });
        Log.Information("Day la send sygnal**************************************");
        await Clients.OthersInGroup(conversationId.ToString()).ReceiveSignal(sendCallSignalDTO.SignalData, conversationId);
        await Clients.OthersInGroup(conversationId.ToString()).ReceiveCall(callerId);

    }

    public async Task AcceptCall(SendCallSignalDTO sendCallSignalDTO)
    {
        var conversationId = sendCallSignalDTO.TargetConversationId;
        Log.Information("Day la accepp sygnal**************************************");
        await Clients.OthersInGroup(conversationId.ToString()).ReceiveAcceptCall(sendCallSignalDTO.SignalData);
    }

    #region Helper method
    private async Task AddUserToGroup(Guid conversationId, Guid userId)
    {
        if (!ConversationUsersMap.TryGetValue(conversationId, out var participants))
        {
            participants = new List<Guid>();
            ConversationUsersMap[conversationId] = participants;
        }

        if (!participants.Contains(userId))
        {
            participants.Add(userId);
        }
        await Groups.AddToGroupAsync(Context.ConnectionId, conversationId.ToString());
    }

    private void RemoveUserFromGroup(Guid conversationId, Guid userId)
    {
        if (ConversationUsersMap.TryGetValue(conversationId, out var participants))
        {
            participants.Remove(userId);

            if (participants.Count == 0)
            {
                // Optionally, remove the conversation if there are no participants
                ConversationUsersMap.TryRemove(conversationId, out _);
            }
        }
    }
    private async Task ConnectWithUserIdAsync(Guid userId)
    {
        UserConnectionMap[Context.ConnectionId] = userId;
        Log.Information($"Map user complete with {Context.ConnectionId} and {userId}");
        Log.Information(userId + " Connected");

        // Admin user
        if (Context.User != null && Context.User.IsInRole("Admin"))
        {
            Log.Information("Add admin to group admin");
            await Groups.AddToGroupAsync(Context.ConnectionId, "Admin");
            return;
        }
        // Public user
        Log.Information("=================Call conversation service by sending message to queue===============");
        var requestClient = _bus.CreateRequestClient<GetConversationByUserIdEvent>();
        var conversationsResponse = await requestClient.GetResponse<ConversationEventResponse>(new GetConversationByUserIdEvent
        {
            UserId = userId
        });

        Log.Information(JsonConvert.SerializeObject(conversationsResponse.Message.Conversations));
        Log.Information("=================Call conversation service by sending message to queue===============");

        foreach (var c in conversationsResponse.Message.Conversations)
        {
            await AddUserToGroup(c.Id, userId);
        }

        foreach (var key in UserConnectionMap.Keys)
        {
            Log.Information($"{key}: {UserConnectionMap[key]}");
        }
        var userIdOnlineList = UserConnectionMap.Select(uc => uc.Value);
        await Clients.All.Connected(userIdOnlineList);
    }
    #endregion
}
