using Microsoft.AspNetCore.SignalR.Client;

namespace ConversationService.Domain.Interfaces;

public interface ISignalRService
{
    HubConnection HubConnection { get; init; }

    Task StartConnectionAsync();
    Task StopConnectionAsync();
    Task InvokeAction<T>(string action, T obj);
}