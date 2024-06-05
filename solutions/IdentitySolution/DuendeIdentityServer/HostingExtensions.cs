using AutoMapper;
using Contract.Event.FriendEvent;
using Duende.IdentityServer;
using DuendeIdentityServer.Data;
using DuendeIdentityServer.DTOs;
using DuendeIdentityServer.Models;
using DuendeIdentityServer.Pages.Profile;
using DuendeIdentityServer.Services;
using MassTransit;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Serilog;

namespace DuendeIdentityServer;

internal static class HostingExtensions
{
    public static WebApplication ConfigureServices(this WebApplicationBuilder builder)
    {
        var services = builder.Services;

        services.AddRazorPages();

        services.AddControllers();

        // Register automapper
        IMapper mapper = MappingConfig.RegisterMaps().CreateMapper();

        builder.Services.AddSingleton(mapper);

        services.AddSingleton<ISignalRService, SignalRService>();

        services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

        services.AddMassTransit(busConfig =>
        {
            busConfig.SetKebabCaseEndpointNameFormatter();

            //busConfig.UsingInMemory((context, config) => config.ConfigureEndpoints(context));
            busConfig.UsingRabbitMq((context, config) =>
            {
                config.Host("amqp://rabbitmq/", host =>
                {
                    host.Username("admin");
                    host.Password("pass");
                });
                config.ConfigureEndpoints(context);

                config.Message<FriendCreatedEvent>(m =>
                {
                    m.SetEntityName("friend-created-event"); // Explicit exchange name
                });

            });
        });

        services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer(Config.GetConnectionString()));

        services.AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();
        services
            .AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                // see https://docs.duendesoftware.com/identityserver/v6/fundamentals/resources/
                options.EmitStaticAudienceClaim = true;
                options.Discovery.CustomEntries.Add("user-api", "~/api/users");
                options.Discovery.CustomEntries.Add("friend-request-api", "~/api/users/friend-request");
            })
            .AddInMemoryIdentityResources(Config.IdentityResources)
            .AddInMemoryApiScopes(Config.ApiScopes)
            .AddInMemoryClients(Config.Clients)
            .AddAspNetIdentity<ApplicationUser>()
            .AddProfileService<ProfileService>()
            .AddDeveloperSigningCredential(); // not recommended for production

        services.AddAuthentication()
            .AddGoogle(options =>
            {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                // register your IdentityServer with Google at https://console.developers.google.com
                // enable the Google+ API
                // set the redirect URI to https://localhost:5001/signin-google
                options.ClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID") ?? "";
                options.ClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET") ?? "";

                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("email");
            });

        services.AddLocalApiAuthentication();

        services.AddCors(o => o.AddPolicy("AllowSpecificOrigins", builder =>
        {
            builder.WithOrigins("http://localhost:3000", "http://localhost:3001", "http://api-gateway")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        }));


        return builder.Build();
    }

    public static WebApplication ConfigurePipeline(this WebApplication app)
    {
        app.UseSerilogRequestLogging();

        if (app.Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        // Chrome using SameSite.None with https scheme. But host is4 with http scheme so SameSiteMode.Lax is required
        app.UseCookiePolicy(new CookiePolicyOptions { MinimumSameSitePolicy = SameSiteMode.Lax });

        app.UseCors("AllowSpecificOrigins");

        app.UseStaticFiles();
        app.UseRouting();
        // UseIdentityServer already call UseAuthenticate()
        app.UseIdentityServer();
        app.UseAuthorization();

        app.MapRazorPages();

        // Add a user api endpoint so this will not be a minimal API
#pragma warning disable ASP0014
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute()
                .RequireAuthorization();
        });

        var signalService = app.Services.GetService<ISignalRService>();
        signalService!.StartConnectionAsync();
        return app;
    }
}