using ChatService.Hubs;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddSignalR();

var app = builder.Build();

// Set endpoint for a chat hub
app.MapHub<ChatHub>("/chatHub");

app.Run();
