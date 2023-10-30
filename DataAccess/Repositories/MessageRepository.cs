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
        public IEnumerable<IndividualMessage> GetIndividualMessageList() => MessageDAO.Instance.GetIndividualMessageList();
        public Message GetMessage(int messageId) => MessageDAO.Instance.GetMessageByID(messageId);
        public IEnumerable<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId) => MessageDAO.Instance.GetIndividualMessageList(senderId, receiverId);
        public int AddMessage(Message message) => MessageDAO.Instance.AddMessage(message);
        public int AddIndividualMessage(IndividualMessage individualMessage) => MessageDAO.Instance.AddIndividualMessage(individualMessage);
        public int UpdateMessage(Message messageUpdate) => MessageDAO.Instance.UpdateMessage(messageUpdate);
        public int DeleteMessage(int messageId) => MessageDAO.Instance.DeleteMessage(messageId);
        public int DeleteIndividualMessage(int messageId) => MessageDAO.Instance.DeleteIndividualMessage(messageId);
    }
}
