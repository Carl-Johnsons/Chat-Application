using BussinessObject.Models;
using DataAccess.Repositories;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class GroupUserDAO
    {
        private static GroupUserDAO? instance = null;
        private static readonly object instanceLock = new();
        private GroupUserDAO() { }

        public static GroupUserDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new GroupUserDAO();
                    return instance;
                }
            }
        }
        private readonly ChatApplicationContext _context = new();
        public List<GroupUser> Get()
        {
            return _context.GroupUser.ToList();
        }
        public List<GroupUser> GetByGroupId(int? groupId)
        {
            _ = groupId ?? throw new Exception("Group id is null");
            return _context.GroupUser
                    .Where(gu => gu.GroupId == groupId)
                    .Include(gu => gu.User)
                    .Select(gu => new GroupUser
                    {
                        GroupId = gu.GroupId,
                        UserId = gu.UserId,
                        User = gu.User,
                    })
                    .ToList();
        }
        public List<GroupUser> GetByUserId(int? userId)
        {
            _ = userId ?? throw new Exception("User Id is null");
            return _context.GroupUser
                    .Where(gu => gu.UserId == userId)
                    .Include(gu => gu.Group)
                    .Select(gu => new GroupUser
                    {
                        GroupId = gu.GroupId,
                        UserId = gu.UserId,
                        Group = gu.Group,
                    })
                    .ToList();
        }
        public GroupUser? GetByGroupIdAndUserId(int? groupId, int? userId)
        {
            EnsureGroupIdAndUserIdNotNull(groupId, userId);
            return _context.GroupUser
                    .Include(gu => gu.Group)
                    .Include(gu => gu.User)
                    .SingleOrDefault(gu => gu.GroupId == groupId
                                    && gu.UserId == userId);
        }
        public int Add(GroupUser groupUser)
        {
            EnsureGroupUserNotExist(groupUser.GroupId, groupUser.UserId);
            EnsureGroupExisted(groupUser.GroupId);
            EnsureUserExisted(groupUser.UserId);
            _context.GroupUser.Add(groupUser);
            return _context.SaveChanges();
        }
        public int Delete(int? groupId, int? userId)
        {
            var groupUser = EnsureGroupUserExisted(groupId, userId);
            _context.GroupUser.Remove(groupUser);
            return _context.SaveChanges();
        }
        /**
         * This method will throw an exception if group or user does not exist
         */
        private void EnsureGroupIdAndUserIdNotNull(int? groupId, int? userId)
        {
            _ = groupId
                    ?? throw new Exception("Group Id can't be null");
            _ = userId
                    ?? throw new Exception("User Id can't be null");
        }
        private void EnsureGroupUserNotExist(int? groupId, int? userId)
        {
            if (GetByGroupIdAndUserId(groupId, userId) != null)
            {
                throw new Exception("This user is already in the group!");
            }
        }
        private void EnsureGroupExisted(int? groupId)
        {
            GroupRepository _groupRepo = new();
            _ = _groupRepo.Get(groupId)
                ?? throw new Exception("This group is not exist!");
        }
        private void EnsureUserExisted(int? userId)
        {
            UserRepository _userRepo = new();
            _ = _userRepo.Get(userId)
                            ?? throw new Exception("This user is not exist!");
        }
        private GroupUser EnsureGroupUserExisted(int? groupId, int? userId)
        {
            EnsureGroupExisted(groupId);
            EnsureUserExisted(userId);
            return GetByGroupIdAndUserId(groupId, userId)
                            ?? throw new Exception("This user is already not in the group!");
        }
    }
}
