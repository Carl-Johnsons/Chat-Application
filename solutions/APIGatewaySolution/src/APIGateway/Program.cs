using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using System.IdentityModel.Tokens.Jwt;

var builder = new WebHostBuilder();
builder.UseKestrel()
       .UseContentRoot(Directory.GetCurrentDirectory())
       .ConfigureAppConfiguration((hostingContext, config) =>
       {
           var env = hostingContext.HostingEnvironment;
           config.
               SetBasePath(env.ContentRootPath)
               .AddOcelot("Config", env)
               //.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true)
               .AddEnvironmentVariables();
       });
// Add logging
builder.ConfigureLogging(options =>
{
    options.AddConsole();
});

// Configure service
builder.ConfigureServices(services =>
{
    services.AddOcelot();
    services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
            //var IdentityServerEndpoint = "http://identity-api";
            var IdentityServerEndpoint = "https://localhost:5001";
            options.Authority = IdentityServerEndpoint;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                // Skip the validate issuer signing key
                ValidateIssuerSigningKey = false,
                SignatureValidator = delegate (string token, TokenValidationParameters parameters)
                {
                    var jwt = new JsonWebToken(token);

                    return jwt;
                },
                //ValidIssuers = [
                //    IdentityServerEndpoint
                //],
            };
            // For development only
            options.IncludeErrorDetails = true;
        });
    services.AddCors(options =>
    {
        options.AddPolicy("AllowAnyOriginPolicy",
            builder =>
            {
                builder.WithOrigins("http://localhost:3001", "http://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
    });
    services.AddSignalR();
});

// Start
builder.Configure(app =>
{
    app.UseCors("AllowAnyOriginPolicy");
    app.UseOcelot().Wait();
})
.Build()
.Run();
