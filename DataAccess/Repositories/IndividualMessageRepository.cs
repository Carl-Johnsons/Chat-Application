
using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class IndividualMessageRepository : IIndividualMessageRepository
    {
        private readonly IndividualMessageDAO IndividualMessageInstance = IndividualMessageDAO.Instance;
        public List<IndividualMessage> Get() => IndividualMessageInstance.Get();
        public List<IndividualMessage> Get(int senderId, int receiverId) => IndividualMessageInstance.Get(senderId, receiverId);
        public List<IndividualMessage> Get(int senderId, int receiverId, int skipBatch) => IndividualMessageInstance.Get(senderId, receiverId, skipBatch);
        public List<IndividualMessage> GetLast(int? senderId) => IndividualMessageInstance.GetLast(senderId);
        public IndividualMessage? GetLast(int senderId, int receiverId) => IndividualMessageInstance.GetLast(senderId, receiverId);
        public int Add(IndividualMessage individualMessage) => IndividualMessageInstance.Add(individualMessage);
        public int Delete(int messageId) => IndividualMessageInstance.Delete(messageId);


    }
}
