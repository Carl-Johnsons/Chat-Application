using ConversationService.Application.Conversations.EventHandlers.FriendCreated;
using ConversationService.Application.Conversations.EventHandlers.GetConversationByUserId;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ConversationService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMassTransit(busConfig =>
        {
            busConfig.SetKebabCaseEndpointNameFormatter();

            //busConfig.UsingInMemory((context, config) => config.ConfigureEndpoints(context));

            busConfig.AddConsumer<FriendCreatedConsumer>();
            busConfig.AddConsumer<GetConversationByUserIdConsumer>();


            busConfig.UsingRabbitMq((context, config) =>
            {
                config.Host(new Uri("amqp://rabbitmq/"), h =>
                {
                    h.Username("admin");
                    h.Password("pass");
                });

                config.ReceiveEndpoint("friend-created-event-queue", e =>
                {
                    e.ConfigureConsumer<FriendCreatedConsumer>(context);
                    e.Bind("friend-created-event"); // Bind to the same exchange
                });

                config.ReceiveEndpoint("get-conversation-by-user-id-event-queue", e =>
                {
                    e.ConfigureConsumer<GetConversationByUserIdConsumer>(context);
                });

                config.ConfigureEndpoints(context);
            });
        });

        services.AddSingleton<ISignalRService, SignalRService>();

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        return services;
    }
}
