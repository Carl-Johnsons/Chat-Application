using NotificationService.API;

var builder = WebApplication.CreateBuilder(args);

var app = builder.AddAPIServices()
                 .Build();

app.UseAPIServicesAsync();

app.Run();
