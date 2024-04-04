using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: false);
var service = builder.Services;

service.AddOcelot(builder.Configuration);
service.AddSignalR();

var app = builder.Build();

app.MapControllers();

await app.UseOcelot();


app.Run();
