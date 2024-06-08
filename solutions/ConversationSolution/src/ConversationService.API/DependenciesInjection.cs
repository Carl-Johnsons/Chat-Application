using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;
using ConversationService.Infrastructure;
using ConversationService.Application;
using ConversationService.Domain.Interfaces;
using ConversationService.API.Middleware;

namespace ConversationService.API;

// You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
public static class DependenciesInjection
{
    public static WebApplicationBuilder AddAPIServices(this WebApplicationBuilder builder)
    {
        builder.Logging.AddConsole();

        var services = builder.Services;
        var config = builder.Configuration;

        services.AddApplicationServices();
        services.AddInfrastructureServices(config);

        services.AddControllers()
                // Prevent circular JSON reach max depth of the object when serialization
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
                    options.JsonSerializerOptions.WriteIndented = true;
                });

        services.AddHttpContextAccessor();


        services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                var IdentityServerEndpoint = "http://identity-api";
                //var IdentityServerEndpoint = "https://localhost:5001";
                options.Authority = IdentityServerEndpoint;
                options.RequireHttpsMetadata = false;
                // Clear default Microsoft's JWT claim mapping
                // Ref: https://stackoverflow.com/questions/70766577/asp-net-core-jwt-token-is-transformed-after-authentication
                options.MapInboundClaims = false;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = false,
                    ValidateAudience = false,
                    ValidateIssuer = false
                };
                // For development only
                options.IncludeErrorDetails = true;
            });

        services.AddEndpointsApiExplorer();

        return builder;
    }

    public static async Task<WebApplication> UseAPIServicesAsync(this WebApplication app)
    {

        app.Use(async (context, next) =>
        {
            // Log information about the incoming request
            app.Logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

            await next(); // Call the next middleware
        });

        app.UseHttpsRedirection();

        app.MapControllers();

        app.UseGlobalHandlingErrorMiddleware();

        app.UseAuthentication();

        app.UseAuthorization();

        var signalService = app.Services.GetService<ISignalRService>();
        await signalService!.StartConnectionAsync();

        return app;
    }
}

