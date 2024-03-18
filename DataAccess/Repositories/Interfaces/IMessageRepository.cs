using BussinessObject.Interfaces;
using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        public List<Message> Get();
        public Message? Get(int? Id);
        public List<Message> Get(int? conversationId, int skip);
        public Message? GetLast(int? conversationId);
        public int AddMessage(Message message);
        public int UpdateMessage(Message messageUpdate);
        public int DeleteMessage(int Id);
    }
}
