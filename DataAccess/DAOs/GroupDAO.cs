using BussinessObject.Models;

namespace DataAccess.DAOs
{
    internal class GroupDAO
    {

        private static GroupDAO? instance = null;
        private static readonly object instanceLock = new();

        private GroupDAO() { }
        public static GroupDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new GroupDAO();
                    return instance;
                }
            }
        }

        private readonly ChatApplicationContext _context = new();

        public int Add(Group group)
        {
            if (group == null)
            {
                throw new Exception("Group can't be null");
            }
            _context.Groups.Add(group);
            return _context.SaveChanges();
        }
        public List<Group> Get()
        {
            return _context.Groups.ToList();
        }
        public Group? GetById(int groupId)
        {
            return _context.Groups.FirstOrDefault(g => g.GroupId == groupId);
        }
        public int Update(Group updatedGroup)
        {
            var oldGroup = GetById(updatedGroup.GroupId)
                    ?? throw new Exception("Group not found! Aborting update operation");
            _context.Entry(oldGroup).CurrentValues.SetValues(updatedGroup);
            return _context.SaveChanges();
        }
        public int Delete(int groupId)
        {
            var group = GetById(groupId)
                    ?? throw new Exception("Group not found! Aborting update operation");
            _context.Groups.Remove(group);
            return _context.SaveChanges();
        }
    }
}
