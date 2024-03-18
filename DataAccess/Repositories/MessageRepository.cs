using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly MessageDAO MessageInstance = MessageDAO.Instance;
        public List<Message> Get() => MessageInstance.Get();
        public Message? Get(int? messageId) => MessageInstance.Get(messageId);
        public List<Message> Get(int? conversationId, int skip) => MessageInstance.Get(conversationId, skip);
        public Message? GetLast(int? conversationId) => MessageInstance.GetLast(conversationId);
        public int AddMessage(Message message) => MessageInstance.Add(message);
        public int UpdateMessage(Message messageUpdate) => MessageInstance.Update(messageUpdate);
        public int DeleteMessage(int messageId) => MessageInstance.Delete(messageId);
    }
}
