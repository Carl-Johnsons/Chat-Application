using BussinessObject.Models;
using DataAccess.DAOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        public IEnumerable<Message> GetMessageList() => MessageDAO.Instance.GetMessageList();
        public Message GetMessageByID(int messageId) => MessageDAO.Instance.GetMessageByID(messageId);
        public int InsertMessage(Message message) => MessageDAO.Instance.AddMessage(message);
        public int UpdateMessage(Message messageUpdate) => MessageDAO.Instance.UpdateMessage(messageUpdate);
        public int DeleteMessage(int messageId) => MessageDAO.Instance.RemoveMessage(messageId);
    }
}
