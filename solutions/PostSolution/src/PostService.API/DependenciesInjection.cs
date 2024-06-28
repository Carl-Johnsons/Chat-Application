using PostService.Application;
using PostService.Infrastructure;
using PostService.API.Middleware;
using Microsoft.IdentityModel.Tokens;
using PostService.Infrastructure.Utilities;
using PostService.Domain.Interfaces;

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


        services.AddAuthentication("Bearer")
            .AddJwtBearer("Bearer", options =>
            {
                var IdentityServerEndpoint = "http://identity-api";
                options.Authority = IdentityServerEndpoint;
                options.RequireHttpsMetadata = false;
                // Clear default Microsoft's JWT claim mapping
                // Ref: https://stackoverflow.com/questions/70766577/asp-net-core-jwt-token-is-transformed-after-authentication
                options.MapInboundClaims = false;

                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = false,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    RoleClaimType = "role" // map jwt claim to role
                };
                // For development only
                options.IncludeErrorDetails = true;
            });

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

        app.UseAuthentication();

        app.UseAuthorization();

        app.UseGlobalHandlingErrorMiddleware();

        app.MapControllers();

        var signalRService = app.Services.GetService<ISignalRService>();
        await signalRService!.StartConnectionAsync();
        return app;
    }
}

