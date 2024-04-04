using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);
builder.Configuration.AddJsonFile("ocelot.json", optional: false, reloadOnChange: false);
var service = builder.Services;

service.AddOcelot(builder.Configuration);

var app = builder.Build();

app.MapGet("/", () => "Hello World!");
app.MapControllers();

await app.UseOcelot();


app.Run();
