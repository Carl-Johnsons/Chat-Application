
namespace ConversationService.Domain.Interfaces;
public interface IDbContext: IDisposable
{
    DbContext Instance { get; }
}
