using Contract.Common;
using ConversationService.Infrastructure.EventPublishing;
using ConversationService.Infrastructure.Persistence;
using ConversationService.Infrastructure.Persistence.Mockup;
using ConversationService.Infrastructure.Utilities;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ConversationService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>();

        // MediatR require repository scope dependency injection
        services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));
        services.AddScoped<MockupData>();
        services.AddScoped(typeof(IPaginateDataUtility<,>), typeof(PaginateDataUtility<,>));
        services.AddSingleton<ISignalRService, SignalRService>();
        services.AddMassTransitService();

        using (var serviceProvider = services.BuildServiceProvider())
        {
            var mockupData = serviceProvider.GetRequiredService<MockupData>();
            mockupData.SeedConversationData().Wait();
        }

        return services;
    }

    private static IServiceCollection AddMassTransitService(this IServiceCollection services)
    {
        services.AddMassTransit(busConfig =>
        {
            busConfig.SetKebabCaseEndpointNameFormatter();

            var applicationAssembly = AppDomain.CurrentDomain.Load("ConversationService.API");
            busConfig.AddConsumers(applicationAssembly);

            busConfig.UsingRabbitMq((context, config) =>
            {
                var username = Environment.GetEnvironmentVariable("RABBITMQ_DEFAULT_USER") ?? "NOT FOUND";
                var password = Environment.GetEnvironmentVariable("RABBITMQ_DEFAULT_PASS") ?? "NOT FOUND";

                config.Host(new Uri("amqp://rabbitmq/"), h =>
                {
                    h.Username(username);
                    h.Password(password);
                });
                RegisterEndpointsFromAttributes(context, config, applicationAssembly);

                config.ConfigureEndpoints(context);
            });
        });
        services.AddScoped<IServiceBus, MassTransitServiceBus>();
        return services;
    }

    private static void RegisterEndpointsFromAttributes(IBusRegistrationContext context, IRabbitMqBusFactoryConfigurator config, Assembly assembly)
    {
        var consumerTypes = assembly.GetTypes().Where(t => t.GetInterfaces().Any(i => i.IsGenericType && i.GetGenericTypeDefinition() == typeof(IConsumer<>)));

        foreach (var consumerType in consumerTypes)
        {
            var queueNameAttribute = consumerType.GetCustomAttribute<QueueNameAttribute>();
            if (queueNameAttribute == null)
            {
                continue;
            }
            config.ReceiveEndpoint(queueNameAttribute.QueueName, endpoint =>
            {
                endpoint.ConfigureConsumer(context, consumerType);

                if (!string.IsNullOrEmpty(queueNameAttribute.ExchangeName))
                {
                    endpoint.Bind(queueNameAttribute.ExchangeName);
                }
            });
        }
    }

}
