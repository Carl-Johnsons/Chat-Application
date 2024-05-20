
using ConversationService.Application;
using ConversationService.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.Text.Json.Serialization;


var builder = WebApplication.CreateBuilder(args);

builder.Logging.AddConsole();

var services = builder.Services;

services.AddApplicationServices();
services.AddInfrastructureServices(builder.Configuration);

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
var app = builder.Build();


app.Use(async (context, next) =>
{
    // Log information about the incoming request
    app.Logger.LogInformation($"Request: {context.Request.Method} {context.Request.Path}");

    await next(); // Call the next middleware
});

app.UseHttpsRedirection();

app.MapControllers();

app.UseAuthentication();

app.UseAuthorization();

app.Run();
