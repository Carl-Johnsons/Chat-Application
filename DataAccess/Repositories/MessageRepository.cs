using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly MessageDAO MessageInstance = MessageDAO.Instance;
        private readonly IndividualMessageDAO IndividualMessageInstance = IndividualMessageDAO.Instance;
        public IEnumerable<Message> GetMessageList() => MessageInstance.Get();
        public IEnumerable<IndividualMessage> GetIndividualMessageList() => IndividualMessageInstance.Get();
        public Message GetMessage(int messageId) => MessageInstance.Get(messageId);
        public IEnumerable<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId) => IndividualMessageInstance.Get(senderId, receiverId);
        public IndividualMessage? GetLastIndividualMessage(int senderId, int receiverId) => IndividualMessageInstance.GetLastMessage(senderId, receiverId);
        public int AddMessage(Message message) => MessageInstance.Add(message);
        public int AddIndividualMessage(IndividualMessage individualMessage) => IndividualMessageInstance.Add(individualMessage);
        public int UpdateMessage(Message messageUpdate) => MessageInstance.Update(messageUpdate);
        public int DeleteMessage(int messageId) => MessageInstance.Delete(messageId);
        public int DeleteIndividualMessage(int messageId) => IndividualMessageInstance.Delete(messageId);

    }
}
