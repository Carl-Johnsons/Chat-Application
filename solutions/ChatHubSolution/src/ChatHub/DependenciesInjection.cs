using ChatHub.Filters;
using ChatHub.Hubs;
using Contract.Event.ConversationEvent;
using MassTransit;
using Microsoft.AspNetCore.SignalR;
using Newtonsoft.Json;

namespace ChatHub;

public static class DependenciesInjection
{

    public static WebApplicationBuilder AddChatHubServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;

        services.AddHttpContextAccessor();

        services.AddSignalR(options =>
        {
            //Global filter
            options.AddFilter<GlobalLoggingFilter>();
        })
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
            option.AddPolicy(name: "AllowSPAClientOrigin", builder =>
            {
                builder.WithOrigins("http://localhost:3000", "http://localhost:3001")
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials();
            });
        });
        return builder;
    }

    public static WebApplication UseChatHubService(this WebApplication app)
    {
        // Set endpoint for a chat hub
        app.MapHub<ChatHubServer>("/chat-hub");
        app.UseCors("AllowSPAClientOrigin");
        return app;
    }
}
