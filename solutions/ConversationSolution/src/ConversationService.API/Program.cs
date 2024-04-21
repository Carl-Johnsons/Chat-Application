
using ConversationService.Application;
using ConversationService.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddApplicationServices();
services.AddInfrastructureServices(builder.Configuration);

services.AddControllers();


services.AddEndpointsApiExplorer();
var app = builder.Build();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
