using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IGroupUserRepository
    {
        public int Add(GroupUser groupUser);
        public int UpdateRole(GroupUser groupUser);
        public List<GroupUser> Get();
        public List<GroupUser> GetByGroupId(int? groupId);
        public List<GroupUser> GetByUserId(int? userId);
        public GroupUser? GetByGroupIdAndUserId(int? groupId, int? userId);
        public int Delete(int? groupId, int? userId);
    }
}
