﻿using Contract.Common;
using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using PostService.Infrastructure.EventPublishing;
using PostService.Infrastructure.Persistence.Mockup;
using PostService.Infrastructure.Utilities;
using System.Reflection;


namespace PostService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services)
    {

        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped(typeof(IPaginateDataUtility<,>), typeof(PaginateDataUtility<,>));
        services.AddScoped<MockupData>();
        services.AddSingleton<ISignalRService, SignalRService>();
        services.AddMassTransitService();

        using (var serviceProvider = services.BuildServiceProvider())
        {
            var mockupData = serviceProvider.GetRequiredService<MockupData>();
            mockupData.SeedTagData().Wait();
            mockupData.SeedInteractionData().Wait();
            mockupData.SeedPostData().Wait();
            mockupData.SeedCommentData().Wait();
            mockupData.SeedPostInteractData().Wait();
            mockupData.SeedContentRestrictionsTypeData().Wait();
        }

        return services;
    }

    private static IServiceCollection AddMassTransitService(this IServiceCollection services)
    {
        services.AddMassTransit(busConfig =>
        {
            busConfig.SetKebabCaseEndpointNameFormatter();

            var applicationAssembly = AppDomain.CurrentDomain.Load("PostService.API");
            busConfig.AddConsumers(applicationAssembly);

            busConfig.UsingRabbitMq((context, config) =>
            {
                var username = Environment.GetEnvironmentVariable("RABBITMQ_DEFAULT_USER") ?? "admin";
                var password = Environment.GetEnvironmentVariable("RABBITMQ_DEFAULT_PASS") ?? "pass";
                var rabbitMQHost = Environment.GetEnvironmentVariable("RABBITMQ_HOST") ?? "localhost:5672";

                config.Host(new Uri($"amqp://{rabbitMQHost}/"), h =>
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
