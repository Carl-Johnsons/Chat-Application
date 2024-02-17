using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IMessageRepository
    {
        public List<Message> GetMessageList();
        public Message? GetMessage(int? messageId);
        public int AddMessage(Message message);
        public int UpdateMessage(Message messageUpdate);
        public int DeleteMessage(int messageId);

        // ======================= Individual message ==================
        public List<IndividualMessage> GetIndividualMessageList();
        public List<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId);
        public List<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId, int skipBatch);
        public IndividualMessage? GetLastIndividualMessage(int senderId, int receiverId);
        public int AddIndividualMessage(IndividualMessage individualMessage);
        public int DeleteIndividualMessage(int messageId);
        // ======================= Group message =======================
        public List<GroupMessage> GetGroupMessageList();
        public List<GroupMessage> GetGroupMessageList(int groupReceiverId);
        public GroupMessage? GetLastGroupMessage(int groupReceiverId);
        public int AddGroupMessage(GroupMessage groupMessage);
        public int DeleteGroupMessage(int messageId);

    }
}
