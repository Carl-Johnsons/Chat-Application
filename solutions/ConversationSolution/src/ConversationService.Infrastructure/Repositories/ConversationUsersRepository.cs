using ConversationService.Core.Entities;
using ConversationService.Infrastructure.DAO;


namespace ConversationService.Infrastructure.Repositories;

public class ConversationUsersRepository
{
    private readonly ConversationUserDAO Instance = ConversationUserDAO.Instance;
    public void Add(ConversationUser conversationUser) => Instance.Add(conversationUser);
    public void Delete(int conversationId, int userId) => Instance.Delete(conversationId, userId);
    public List<ConversationUser> Get() => Instance.Get();
    public ConversationUser? Get(int conversationId, int userId) => Instance.Get(conversationId, userId);
    public List<ConversationUser> GetByConversationId(int conversationId) => Instance.GetByConversationId(conversationId);
    public List<ConversationUser> GetByUserId(int userId) => Instance.GetByUserId(userId);
    public ConversationUser? GetIndividualConversation(int userId, int user2Id) => Instance.GetIndividualConversation(userId, user2Id);
}
