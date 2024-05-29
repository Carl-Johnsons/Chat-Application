using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using UploadFileService.Infrastructure.Persistence;

namespace UploadFileService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {
        DotNetEnv.Env.Load();
        var server = DotNetEnv.Env.GetString("SERVER", "Not found");
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found");

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        services.AddDbContext<IApplicationDbContext, ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        return services;
    }
}
