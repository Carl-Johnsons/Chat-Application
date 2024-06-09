using PostService.Application;
using PostService.Infrastructure;
using PostService.API.Middleware;

namespace PostService.API;

// You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
public static class DependenciesInjection
{
    public static WebApplicationBuilder AddAPIServices(this WebApplicationBuilder builder)
    {
        builder.Logging.AddConsole();

        var services = builder.Services;
        var config = builder.Configuration;

        services.AddApplicationServices();
        services.AddInfrastructureServices();
        services.AddHttpContextAccessor();

        services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return builder;
    }

    public static async Task<WebApplication> UseAPIServicesAsync(this WebApplication app)
    {

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseHttpsRedirection();

        app.UseAuthorization();

        app.UseGlobalHandlingErrorMiddleware();

        app.MapControllers();

        return app;
    }
}

