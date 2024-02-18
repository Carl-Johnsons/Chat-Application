using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class MessageRepository : IMessageRepository
    {
        private readonly MessageDAO MessageInstance = MessageDAO.Instance;
        private readonly IndividualMessageDAO IndividualMessageInstance = IndividualMessageDAO.Instance;
        private readonly GroupMessageDAO GroupMessageIntance = GroupMessageDAO.Instance;
        public List<Message> GetMessageList() => MessageInstance.Get();
        public Message? GetMessage(int? messageId) => MessageInstance.Get(messageId);
        public int AddMessage(Message message) => MessageInstance.Add(message);
        public int UpdateMessage(Message messageUpdate) => MessageInstance.Update(messageUpdate);
        public int DeleteMessage(int messageId) => MessageInstance.Delete(messageId);

        // ======================= Individual message ==================
        public List<IndividualMessage> GetIndividualMessageList() => IndividualMessageInstance.Get();
        public List<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId) => IndividualMessageInstance.Get(senderId, receiverId);
        public List<IndividualMessage> GetIndividualMessageList(int senderId, int receiverId, int skipBatch) => IndividualMessageInstance.Get(senderId, receiverId, skipBatch);
        public IndividualMessage? GetLastIndividualMessage(int senderId, int receiverId) => IndividualMessageInstance.GetLastMessage(senderId, receiverId);
        public int AddIndividualMessage(IndividualMessage individualMessage) => IndividualMessageInstance.Add(individualMessage);
        public int DeleteIndividualMessage(int messageId) => IndividualMessageInstance.Delete(messageId);

        // ======================= Group message =======================
        public List<GroupMessage> GetGroupMessageList() => GroupMessageIntance.Get();
        public List<GroupMessage> GetGroupMessageList(int groupReceiverId) => GroupMessageIntance.Get(groupReceiverId);
        public List<GroupMessage> GetGroupMessageList(int groupReceiverId, int skipBatch) => GroupMessageIntance.Get(groupReceiverId, skipBatch);
        public GroupMessage? GetLastGroupMessage(int groupReceiverId) => GroupMessageIntance.GetLastMessage(groupReceiverId);

        public int AddGroupMessage(GroupMessage groupMessage) => GroupMessageIntance.Add(groupMessage);

        public int DeleteGroupMessage(int messageId) => GroupMessageIntance.Delete(messageId);
    }
}
