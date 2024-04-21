namespace ConversationService.Domain.Interfaces;

public interface IConversationUsersRepository : IBaseRepository<ConversationUser>
{
    Task<ConversationUser?> GetAsync(int conversationId, int userId);
    Task<List<ConversationUser>> GetByConversationIdAsync(int conversationId);
    List<ConversationUser> GetByUserId(int userId);
    ConversationUser? GetIndividualConversation(int userId, int user2Id);
}