using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class GroupUserRepository : IGroupUserRepository
    {
        private readonly GroupUserDAO Instance = GroupUserDAO.Instance;
        public int Add(GroupUser groupUser) => Instance.Add(groupUser);

        public int Delete(int? groupId, int? userId) => Instance.Delete(groupId, userId);

        public List<GroupUser> Get() => Instance.Get();

        public List<GroupUser> GetByGroupId(int? groupId) => Instance.GetByGroupId(groupId);

        public GroupUser? GetByGroupIdAndUserId(int? groupId, int? userId)
                => Instance.GetByGroupIdAndUserId(groupId, userId);

        public List<GroupUser> GetByUserId(int? userId) => Instance.GetByUserId(userId);
    }
}
