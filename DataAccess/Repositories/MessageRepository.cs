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
        public IEnumerable<Message> GetMessageList() => MessageDAO.Instance.Get();
        public IEnumerable<IndividualMessage> GetIndividualMessageList() => IndividualMessageDAO.Instance.Get();
        public Message GetMessage(int messageId) => MessageDAO.Instance.Get(messageId);
        public IEnumerable<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId) => IndividualMessageDAO.Instance.Get(senderId, receiverId);
        public int AddMessage(Message message) => MessageDAO.Instance.Add(message);
        public int AddIndividualMessage(IndividualMessage individualMessage) => IndividualMessageDAO.Instance.Add(individualMessage);
        public int UpdateMessage(Message messageUpdate) => MessageDAO.Instance.Update(messageUpdate);
        public int DeleteMessage(int messageId) => MessageDAO.Instance.Delete(messageId);
        public int DeleteIndividualMessage(int messageId) => IndividualMessageDAO.Instance.Delete(messageId);
    }
}
