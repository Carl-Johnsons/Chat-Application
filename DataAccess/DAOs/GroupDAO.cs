using BussinessObject.Models;
using System.Diagnostics.CodeAnalysis;

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

        public int Add(Group? group)
        {
            using var _context = new ChatApplicationContext();
            EnsureGroupNotNull(group);
            _context.Groups.Add(group);
            return _context.SaveChanges();
        }
        public List<Group> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.Groups.ToList();
        }
        public Group? Get(int? groupId)
        {
            using var _context = new ChatApplicationContext();
            return _context.Groups.SingleOrDefault(g => g.GroupId == groupId);
        }
        public int Update(Group? updatedGroup)
        {
            using var _context = new ChatApplicationContext();
            EnsureGroupNotNull(updatedGroup);
            var oldGroup = EnsureGroupExisted(updatedGroup.GroupId);
            _context.Entry(oldGroup).CurrentValues.SetValues(updatedGroup);
            return _context.SaveChanges();
        }
        public int Delete(int? groupId)
        {
            using var _context = new ChatApplicationContext();
            var group = EnsureGroupExisted(groupId);
            _context.Groups.Remove(group);
            return _context.SaveChanges();
        }
        private void EnsureGroupNotNull([NotNull] Group? group)
        {
            _ = group ?? throw new Exception("Group can't be null");
        }
        private Group EnsureGroupExisted([NotNull] int? groupId)
        {
            _ = groupId
                    ?? throw new Exception("Group Id can't be null");
            var group = Get(groupId)
                    ?? throw new Exception("Group not found!");
            return group;
        }
    }
}
