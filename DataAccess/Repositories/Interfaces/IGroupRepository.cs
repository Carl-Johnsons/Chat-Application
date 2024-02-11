using BussinessObject.Models;

namespace DataAccess.Repositories.Interfaces
{
    public interface IGroupRepository
    {
        public int Add(Group? group);
        public List<Group> Get();
        public Group? Get(int? groupId);
        public int Update(Group? group);
        public int Delete(int? groupId);
    }
}
