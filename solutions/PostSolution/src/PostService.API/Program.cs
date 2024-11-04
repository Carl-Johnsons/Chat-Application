using Microsoft.AspNetCore.Hosting.Server.Features;
using Microsoft.AspNetCore.Hosting.Server;
using PostService.API;

var builder = WebApplication.CreateBuilder(args);

var app = builder.AddAPIServices()
                 .Build();

await app.UseAPIServicesAsync();

app.Start();

var server = app.Services.GetService<IServer>();
var addresses = server?.Features.Get<IServerAddressesFeature>()?.Addresses;

if (addresses != null)
{
    foreach (var address in addresses)
    {
        Console.WriteLine($"API is listening on: {address}");
    }
}
else
{
    Console.WriteLine("Could not retrieve server addresses.");
}

app.WaitForShutdown();