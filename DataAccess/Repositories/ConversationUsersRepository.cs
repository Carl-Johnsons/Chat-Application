
using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class ConversationUsersRepository : IConversationUsersRepository
    {
        private readonly ConversationUsersDAO Instance = ConversationUsersDAO.Instance;
        public void Add(ConversationUser conversationUser) => Instance.Add(conversationUser);
        public void Delete(int conversationId, int userId) => Instance.Delete(conversationId, userId);
        public List<ConversationUser> Get() => Instance.Get();
        public ConversationUser? Get(int conversationId, int userId) => Instance.Get(conversationId, userId);
        public List<ConversationUser> GetByConversationId(int conversationId) => Instance.GetByConversationId(conversationId);
        public List<ConversationUser> GetByUserId(int userId) => Instance.GetByUserId(userId);
    }
}
