using BussinessObject.Interfaces;
using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        public List<Message> GetMessageList();
        public Message? GetMessage(int? messageId);
        public List<IMessage> GetLastestLastMessageList(int? userId);
        public int AddMessage(Message message);
        public int UpdateMessage(Message messageUpdate);
        public int DeleteMessage(int messageId);
    }
}
