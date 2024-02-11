using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class GroupBlockDAO
    {
        private static GroupBlockDAO? instance = null;
        private static readonly object instanceLock = new();
        public static GroupBlockDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new GroupBlockDAO();
                    return instance;
                }

            }
        }
        public List<GroupBlock> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.GroupBlocks.Include(gb => gb.Group).Include(gb => gb.BlockedUserId).ToList();
        }
        public List<GroupBlock> GetByGroupID(int? groupId)
        {
            _ = groupId ?? throw new Exception("Group id is null");
            return Get().Where(gb => gb.GroupId == groupId).ToList();
        }
        public List<GroupBlock> GetByUserId(int? userId)
        {
            _ = userId ?? throw new Exception("User id is null");
            return Get().Where(gb => gb.BlockedUserId == userId).ToList();
        }
        public GroupBlock? GetByGroupIdAndUserId(int? groupId, int? userId)
        {
            _ = groupId ?? throw new Exception("Group id is null");
            _ = userId ?? throw new Exception("User id is null");
            return Get().SingleOrDefault(gb => gb.GroupId == groupId && gb.BlockedUserId == userId);

        }
        public int Add(GroupBlock? groupBlock)
        {
            using var _context = new ChatApplicationContext();
            _ = groupBlock
                    ?? throw new Exception("group to block is null ! Aborting add operation");
            if (GetByGroupIdAndUserId(groupBlock.GroupId, groupBlock.BlockedUserId) != null)
            {
                throw new Exception("This user has already been blocked by this group ! Aborting add operation");
            }
            _context.GroupBlocks.Add(groupBlock);
            return _context.SaveChanges();
        }
        public int Delete(int groupId, int blockUserId)
        {
            using var _context = new ChatApplicationContext();
            var groupBlock = GetByGroupIdAndUserId(groupId, blockUserId)
                        ?? throw new Exception("Group block not found! aborting update operation");
            _context.GroupBlocks.Remove(groupBlock);
            return _context.SaveChanges();
        }
    }
}
