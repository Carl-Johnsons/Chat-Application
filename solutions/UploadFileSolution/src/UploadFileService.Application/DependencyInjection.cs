using CloudinaryDotNet;
using MassTransit;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace UploadFileService.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationService(this IServiceCollection services)
    {
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
        });

        services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

        DotNetEnv.Env.Load();
        services.AddSingleton(sp => {
            var cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("Cloudinary_URL"));
            cloudinary.Api.Secure = true;
            return cloudinary;
        });
        return services;
    }
}
