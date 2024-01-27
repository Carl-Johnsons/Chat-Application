using ChatService.Hubs;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();

//Add CORS to allow request API on different port
builder.Services.AddCors(
    options =>
    {
        options.AddDefaultPolicy(
            policy =>
            {
                // The URI must be the exact like this, no trailing "/"
                // Example: wrong origin: https://localhost:7093/
                policy.WithOrigins("http://localhost:8000")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials();
            }
        );
    });

var app = builder.Build();

// Set endpoint for a chat hub
app.MapHub<ChatHub>("/chatHub");
app.UseCors();
app.Run();
