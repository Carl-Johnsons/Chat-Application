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
        DotNetEnv.Env.Load();
        var server = DotNetEnv.Env.GetString("SERVER", "Not found");
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found");

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString, sqlOptions =>
            {
                sqlOptions.EnableRetryOnFailure(
                    maxRetryCount: 10,
                    maxRetryDelay: TimeSpan.FromSeconds(5),
                    errorNumbersToAdd: null);
            });
        });


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
                var username = Environment.GetEnvironmentVariable("RBMQ_USERNAME") ?? "NOT FOUND";
                var password = Environment.GetEnvironmentVariable("RBMQ_PASSWORD") ?? "NOT FOUND";
                Console.WriteLine($"Log in rabbitmq with username:{username}| password:{password}");
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
