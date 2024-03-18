
using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class ConversationRepository : IConversationRepository
    {
        private readonly ConversationDAO Instance = ConversationDAO.Instance;

        public void Add(Conversation conversation) => Instance.Add(conversation);

        public void Delete(int conversationId) => Instance.Delete(conversationId);

        public List<Conversation> Get() => Instance.Get();

        public Conversation? Get(int id) => Instance.Get(id);

        public void Update(Conversation conversation) => Instance.Update(conversation);
    }
}
