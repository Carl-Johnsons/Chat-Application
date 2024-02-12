using BussinessObject.Models;
using DataAccess.Utils;
using System.Diagnostics.CodeAnalysis;

namespace DataAccess.DAOs
{
    internal class GroupDAO
    {

        private static GroupDAO? instance = null;
        private static readonly object instanceLock = new();

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
        private readonly ValidationUtils validation;
        private GroupDAO()
        {
            validation = new ValidationUtils();
        }

        public int Add(Group? group)
        {
            using var _context = new ChatApplicationContext();
            validation.EnsureGroupNotNull(group);
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
            validation.EnsureGroupIdNotNull(groupId);
            using var _context = new ChatApplicationContext();
            return _context.Groups.SingleOrDefault(g => g.GroupId == groupId);
        }
        public int Update(Group? updatedGroup)
        {
            using var _context = new ChatApplicationContext();
            validation.EnsureGroupNotNull(updatedGroup);
            var oldGroup = validation.EnsureGroupExisted(updatedGroup.GroupId);
            _context.Entry(oldGroup).CurrentValues.SetValues(updatedGroup);
            _context.Groups.Update(oldGroup);
            return _context.SaveChanges();
        }
        public int Delete(int? groupId)
        {
            using var _context = new ChatApplicationContext();
            var group = validation.EnsureGroupExisted(groupId);
            _context.Groups.Remove(group);
            return _context.SaveChanges();
        }

    }
}
