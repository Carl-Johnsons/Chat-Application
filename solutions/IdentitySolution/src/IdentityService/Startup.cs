// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityService.Data;
using IdentityService.Models;
using IdentityService.Quickstart;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

using System.Linq;

namespace IdentityService;

public class Startup
{
    public IWebHostEnvironment Environment { get; }
    public IConfiguration Configuration { get; }

    public Startup(IWebHostEnvironment environment, IConfiguration configuration)
    {
        Environment = environment;
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        DotNetEnv.Env.Load(".env");

        var server = DotNetEnv.Env.GetString("SERVER", "Not found");
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found");
        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";


        services.AddControllersWithViews();

        services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));

        services.AddIdentity<ApplicationUser, IdentityRole>(config =>
        {
            config.SignIn.RequireConfirmedEmail = false;
            config.SignIn.RequireConfirmedPhoneNumber = false;
            config.User.RequireUniqueEmail = true;

            config.Password.RequiredLength = 6;
            config.Password.RequireLowercase = false;
            config.Password.RequireUppercase = false;
        })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

        var migrationAssembly = typeof(Startup).Assembly.GetName().Name;


        // Persist identity server data to database through ef-core
        var builder = services.AddIdentityServer(options =>
        {
            options.Events.RaiseErrorEvents = true;
            options.Events.RaiseInformationEvents = true;
            options.Events.RaiseFailureEvents = true;
            options.Events.RaiseSuccessEvents = true;

            // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
            options.EmitStaticAudienceClaim = true;
        })
          .AddAspNetIdentity<ApplicationUser>()
          .AddTestUsers(TestUsers.Users)
          .AddConfigurationStore(options =>
          {
              options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                                            sql => sql.MigrationsAssembly(migrationAssembly));
          })
          .AddOperationalStore(options =>
          {
              options.ConfigureDbContext = b => b.UseSqlServer(connectionString,
                                            sql => sql.MigrationsAssembly(migrationAssembly));
          });

        // not recommended for production - you need to store your key material somewhere secure
        builder.AddDeveloperSigningCredential();

        services.AddAuthentication()
            .AddOpenIdConnect(options =>
            {
                options.Authority = "https://localhost:6001";
                options.ClientId = "myclient";
                options.ClientSecret = "mysecret";
                options.ResponseType = "code";

                options.Scope.Clear();
                options.Scope.Add("openid");
                options.Scope.Add("profile");
                options.Scope.Add("email");

                options.SaveTokens = true;
                options.SignedOutRedirectUri = "/";
                options.GetClaimsFromUserInfoEndpoint = true;

                options.Prompt = "consent";
            })
            .AddGoogle(options =>
            {
                options.SignInScheme = IdentityServerConstants.ExternalCookieAuthenticationScheme;

                // register your IdentityServer with Google at https://console.developers.google.com
                // enable the Google+ API
                // set the redirect URI to https://localhost:5001/signin-google
                options.ClientId = "copy client ID from Google here";
                options.ClientSecret = "copy client secret from Google here";
            });
    }

    public void Configure(IApplicationBuilder app)
    {
        // This method should be called only once if identity database didn't exist
        InitializeDatabase(app);

        if (Environment.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseDatabaseErrorPage();
        }

        app.UseStaticFiles();

        app.UseRouting();
        app.UseIdentityServer();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapDefaultControllerRoute();
        });
    }

    private void InitializeDatabase(IApplicationBuilder app)
    {
        using var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope();

        var serviceProvider = serviceScope.ServiceProvider;
        serviceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();

        var context = serviceProvider.GetRequiredService<ConfigurationDbContext>();
        context.Database.Migrate();

        // Seed data
        if (!context.Clients.Any())
        {
            foreach (var client in Config.Clients)
            {
                context.Clients.Add(client.ToEntity());
            }
            context.SaveChanges();
        }

        if (!context.IdentityResources.Any())
        {
            foreach (var identityResource in Config.IdentityResources)
            {
                context.IdentityResources.Add(identityResource.ToEntity());
            }
            context.SaveChanges();
        }
        if (!context.ApiScopes.Any())
        {
            foreach (var resource in Config.ApiScopes)
            {
                context.ApiScopes.Add(resource.ToEntity());
            }
            context.SaveChanges();
        }
    }

}