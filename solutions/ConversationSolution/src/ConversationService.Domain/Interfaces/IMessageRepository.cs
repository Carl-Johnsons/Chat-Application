namespace ConversationService.Domain.Interfaces;

public interface IMessageRepository : IBaseRepository<Message>
{
    Task<List<Message>> GetAsync(int conversationId, int skip);
    Task<Message?> GetLastAsync(int conversationId);
}