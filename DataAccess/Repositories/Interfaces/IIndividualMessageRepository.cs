using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IIndividualMessageRepository
    {
        public List<IndividualMessage> Get();
        public List<IndividualMessage> Get(int senderId, int receiverId);
        public List<IndividualMessage> Get(int senderId, int receiverId, int skipBatch);
        public List<IndividualMessage> GetLast(int? senderId);
        public IndividualMessage? GetLast(int senderId, int receiverId);
        public int Add(IndividualMessage individualMessage);
        public int Delete(int messageId);
    }
}
