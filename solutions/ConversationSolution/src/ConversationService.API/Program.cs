
using System.Reflection;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(Assembly.GetExecutingAssembly()));

services.AddControllers();

services.AddEndpointsApiExplorer();
var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
