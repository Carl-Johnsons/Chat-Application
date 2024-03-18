using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IConversationRepository
    {
        public List<Conversation> Get();
        public Conversation? Get(int id);
        public void Add(Conversation conversation);
        public void Update(Conversation conversation);
        public void Delete(int conversationId);
    }
}
