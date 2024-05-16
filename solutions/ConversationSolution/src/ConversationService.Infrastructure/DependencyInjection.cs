using ConversationService.Infrastructure.Persistence;
using ConversationService.Infrastructure.Persistence.Repositories;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ConversationService.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration config)
    {
        DotNetEnv.Env.Load();
        var server = DotNetEnv.Env.GetString("SERVER", "Not found");
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found");

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        
        // MediatR require repository scope denpendency injection
        services.AddScoped(typeof(IConversationRepository), typeof(ConversationRepository));
        services.AddScoped(typeof(IConversationUsersRepository), typeof(ConversationUsersRepository));
        services.AddScoped(typeof(IMessageRepository), typeof(MessageRepository));
        services.AddScoped(typeof(IUnitOfWork), typeof(UnitOfWork));

        return services;
    }
}
