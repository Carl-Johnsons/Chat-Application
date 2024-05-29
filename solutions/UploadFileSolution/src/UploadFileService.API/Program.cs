using System.Text.Json.Serialization;
using UploadFileService.Application;
using UploadFileService.Infrastructure;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
services.AddApplicationService();
services.AddInfrastructureServices(builder.Configuration);

services.AddControllers()
        // Prevent circular JSON reach max depth of the object when serialization
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            options.JsonSerializerOptions.WriteIndented = true;
        });
// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.MapControllers();

app.Run();
