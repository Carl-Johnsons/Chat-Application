using MassTransit;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace PostService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services)
    {
        services.AddMassTransit(busConfig =>
        {
            busConfig.SetKebabCaseEndpointNameFormatter();

            //busConfig.UsingInMemory((context, config) => config.ConfigureEndpoints(context));



            busConfig.UsingRabbitMq((context, config) =>
            {
                config.Host(new Uri("amqp://rabbitmq/"), h =>
                {
                    h.Username("admin");
                    h.Password("pass");
                });


                config.ConfigureEndpoints(context);
            });
        });
        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));
        return services;
    }
}
