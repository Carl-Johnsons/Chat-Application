namespace ConversationService.Domain.Interfaces;

public interface IConversationUsersRepository : IBaseRepository<ConversationUser>
{
    Task<ConversationUser?> GetAsync(Guid conversationId, Guid userId);
    Task<List<ConversationUser>> GetByConversationIdAsync(Guid conversationId);
    List<ConversationUser> GetByUserId(Guid userId);
    ConversationUser? GetIndividualConversation(Guid userId, Guid user2Id);
}