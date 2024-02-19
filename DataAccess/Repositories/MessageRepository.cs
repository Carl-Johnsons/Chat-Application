using BussinessObject.Interfaces;
using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly MessageDAO MessageInstance = MessageDAO.Instance;
        public List<Message> GetMessageList() => MessageInstance.Get();
        public Message? GetMessage(int? messageId) => MessageInstance.Get(messageId);
        public List<IMessage> GetLastestLastMessageList(int? userId) => MessageInstance.GetLastestLastMessageList(userId);
        public int AddMessage(Message message) => MessageInstance.Add(message);
        public int UpdateMessage(Message messageUpdate) => MessageInstance.Update(messageUpdate);
        public int DeleteMessage(int messageId) => MessageInstance.Delete(messageId);
    }
}
