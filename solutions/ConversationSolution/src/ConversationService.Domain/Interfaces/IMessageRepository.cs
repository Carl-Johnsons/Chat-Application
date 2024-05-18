namespace ConversationService.Domain.Interfaces;

public interface IMessageRepository : IBaseRepository<Message>
{
    Task<List<Message>> GetAsync(Guid conversationId, int skip);
    Task<Message?> GetLastAsync(Guid conversationId);
}