using ChatHub.Hubs;
using Contract.Event.ConversationEvent;
using MassTransit;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddSignalR();
services.AddHttpContextAccessor();

services.AddSignalR()
    .AddNewtonsoftJsonProtocol(options =>
    {
        options.PayloadSerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
    });

services.AddMassTransit(busConfig =>
{
    busConfig.SetKebabCaseEndpointNameFormatter();

    busConfig.UsingRabbitMq((context, config) =>
    {
        config.Host(new Uri("amqp://rabbitmq/"), h =>
        {
            h.Username("admin");
            h.Password("pass");
        });

        config.ConfigureEndpoints(context);
    });

    busConfig.AddRequestClient<GetConversationByUserIdEvent>(new Uri("queue:get-conversation-by-user-id-event-queue"));
});


services.AddCors(option =>
{
    option.AddPolicy(name: "AllowSPAClientOrign", builder =>
    {
        builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials();
    });
});


var app = builder.Build();

// Set endpoint for a chat hub
app.MapHub<ChatHubServer>("/chat-hub");
app.UseCors("AllowSPAClientOrign");
app.Run();
