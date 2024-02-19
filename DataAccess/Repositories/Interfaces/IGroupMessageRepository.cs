using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IGroupMessageRepository
    {
        public List<GroupMessage> Get();
        public List<GroupMessage> Get(int groupReceiverId);
        public List<GroupMessage> Get(int groupReceiverId, int skipBatch);
        public List<GroupMessage> GetLastByUserId(int? userId);
        public GroupMessage? GetLastByGroupId(int? groupReceiverId);
        public int Add(GroupMessage groupMessage);
        public int Delete(int messageId);
    }
}
