using ChatHub;

var builder = WebApplication.CreateBuilder(args)
                .AddChatHubServices();
var app = builder.Build();
app.UseChatHubService();
app.Map("/hello", () =>
{
    return "hello";
});
app.Run();
public partial class Program { }