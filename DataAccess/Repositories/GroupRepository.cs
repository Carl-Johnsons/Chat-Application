using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly GroupDAO Instance = GroupDAO.Instance;
        public int Add(Group? group) => Instance.Add(group);
        public List<Group> Get() => Instance.Get();
        public Group? Get(int? groupId) => Instance.Get(groupId);
        public int Update(Group? group) => Instance.Update(group);
        public int Delete(int? groupId) => Instance.Delete(groupId);
    }
}
