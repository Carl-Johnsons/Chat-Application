using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class GroupMessageRepository : IGroupMessageRepository
    {
        private readonly GroupMessageDAO GroupMessageIntance = GroupMessageDAO.Instance;
        public List<GroupMessage> Get() => GroupMessageIntance.Get();
        public List<GroupMessage> Get(int groupReceiverId) => GroupMessageIntance.Get(groupReceiverId);
        public List<GroupMessage> Get(int groupReceiverId, int skipBatch) => GroupMessageIntance.Get(groupReceiverId, skipBatch);
        public List<GroupMessage> GetLastByUserId(int? userId) => GroupMessageIntance.GetLastByUserId(userId);
        public GroupMessage? GetLastByGroupId(int? groupReceiverId) => GroupMessageIntance.GetLastByGroupId(groupReceiverId);

        public int Add(GroupMessage groupMessage) => GroupMessageIntance.Add(groupMessage);

        public int Delete(int messageId) => GroupMessageIntance.Delete(messageId);


    }
}
