using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IConversationUsersRepository
    {
        public List<ConversationUser> Get();
        public ConversationUser? Get(int conversationId, int userId);
        public List<ConversationUser> GetByConversationId(int conversationId);
        public List<ConversationUser> GetByUserId(int userId);
        public void Add(ConversationUser conversationUser);
        public void Delete(int conversationId, int userId);
    }
}
