using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class UserBlockDAO : ChatApplicationContext
    {
        //using singleton to access db by one instance variable
        private static UserBlockDAO? instance = null;
        private static readonly object instanceLock = new();
        private UserBlockDAO() { }
        public static UserBlockDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new UserBlockDAO();
                    return instance;
                }
            }
        }
        private readonly ChatApplicationContext _context = new();
        public List<UserBlock> Get()
        {

            return _context.UserBlocks
                            .Include(ub => ub.BlockedUser)
                            .Include(ub => ub.User)
                            .ToList(); ;
        }
        public List<UserBlock> GetByUserId(int? userId)
        {
            _ = userId ?? throw new Exception("user id is null");
            return _context.UserBlocks
                            .Include(ub => ub.BlockedUser)
                            .Include(ub => ub.User)
                            .Where(u => u.UserId == userId)
                            .ToList();
        }
        public List<UserBlock> GetByBlockedUserId(int? blockedUserId)
        {
            _ = blockedUserId ?? throw new Exception("block user id is null");
            return _context.UserBlocks
                            .Include(ub => ub.BlockedUser)
                            .Include(ub => ub.User)
                            .Where(u => u.BlockedUserId == blockedUserId)
                            .ToList();
        }
        public UserBlock? GetByUserIdAndBlockedUserId(int? userId, int? blockedUserId)
        {
            _ = userId ?? throw new Exception("user id is null");
            _ = blockedUserId ?? throw new Exception("block user id is null");
            return _context.UserBlocks
                            .Include(ub => ub.BlockedUser)
                            .Include(ub => ub.User)
                            .SingleOrDefault(u => u.UserId == userId 
                                            && u.BlockedUserId == blockedUserId);
        }
        public int Add(UserBlock userBlock)
        {
            if (GetByUserIdAndBlockedUserId(userBlock.UserId, userBlock.BlockedUserId) != null)
            {
                throw new Exception("This user has already been block by that user! Aborting add operation");
            }
            _context.UserBlocks.Add(userBlock);
            return _context.SaveChanges();
        }
        public int Delete(int userId, int blockedUserID)
        {
            var userblocked = GetByUserIdAndBlockedUserId(userId, blockedUserID)
                        ?? throw new Exception("User block not found! Aborting delete operation");
            _context.UserBlocks.Remove(userblocked);
            return _context.SaveChanges();
        }
    }
}
