using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = new WebHostBuilder();
builder.UseKestrel()
       .UseContentRoot(Directory.GetCurrentDirectory())
       .ConfigureAppConfiguration((hostingContext, config) =>
       {
           var env = hostingContext.HostingEnvironment;
           config.
               SetBasePath(env.ContentRootPath)
               .AddJsonFile("ocelot.json", optional: false, reloadOnChange: true)
               .AddOcelot("Config", env)
               .AddEnvironmentVariables();
       });

// Configure service
builder.ConfigureServices(services =>
{
    services.AddOcelot();
    services.AddAuthentication()
            .AddJwtBearer("Bearer", options =>
            {
                options.Authority = "http://identity-api";
            });
    services.AddSignalR();
});

// Start
builder.Configure(app =>
{
    app.UseOcelot().Wait();

})
.Build()
.Run();
