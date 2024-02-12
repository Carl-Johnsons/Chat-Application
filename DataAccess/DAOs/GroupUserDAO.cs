using BussinessObject.Constants;
using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class GroupUserDAO
    {

        private static GroupUserDAO? instance = null;
        private static readonly object instanceLock = new();
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
        private readonly ValidationUtils validation;
        private GroupUserDAO()
        {
            validation = new ValidationUtils();
        }
        public List<GroupUser> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.GroupUser.ToList();
        }
        public List<GroupUser> GetByGroupId(int? groupId)
        {
            validation.EnsureGroupIdNotNull(groupId);
            using var _context = new ChatApplicationContext();
            return _context.GroupUser
                    .Where(gu => gu.GroupId == groupId)
                    .Include(gu => gu.User)
                    .Select(gu => new GroupUser
                    {
                        GroupId = gu.GroupId,
                        UserId = gu.UserId,
                        Role = gu.Role,
                    })
                    .ToList();
        }
        public List<GroupUser> GetByUserId(int? userId)
        {
            validation.EnsureUserIdNotNull(userId);
            using var _context = new ChatApplicationContext();
            return _context.GroupUser
                    .Where(gu => gu.UserId == userId)
                    .Include(gu => gu.Group)
                    .Select(gu => new GroupUser
                    {
                        GroupId = gu.GroupId,
                        UserId = gu.UserId,
                        Role = gu.Role,
                        Group = gu.Group
                    })
                    .ToList();
        }
        public GroupUser? GetByGroupIdAndUserId(int? groupId, int? userId)
        {
            validation.EnsureGroupExisted(groupId);
            validation.EnsureUserExisted(userId);
            using var _context = new ChatApplicationContext();
            return _context.GroupUser
                    .Include(gu => gu.Group)
                    .Include(gu => gu.User)
                    .SingleOrDefault(gu => gu.GroupId == groupId
                                    && gu.UserId == userId);
        }
        public int Add(GroupUser groupUser)
        {
            validation.EnsureGroupUserNotExist(groupUser.GroupId, groupUser.UserId);
            validation.EnsureGroupExisted(groupUser.GroupId);
            validation.EnsureUserExisted(groupUser.UserId);
            validation.EnsureRoleValid(groupUser.Role);
            using var _context = new ChatApplicationContext();
            _context.GroupUser.Add(groupUser);
            return _context.SaveChanges();
        }
        public int UpdateRole(GroupUser groupUser)
        {
            GroupUser oldGroupUser = validation.EnsureGroupUserExisted(groupUser.GroupId, groupUser.UserId);
            validation.EnsureRoleValid(groupUser.Role);
            oldGroupUser.Role = groupUser.Role;
            using var _context = new ChatApplicationContext();
            _context.GroupUser.Update(oldGroupUser);
            return _context.SaveChanges();
        }
        public int Delete(int? groupId, int? userId)
        {
            var groupUser = validation.EnsureGroupUserExisted(groupId, userId);
            using var _context = new ChatApplicationContext();
            _context.GroupUser.Remove(groupUser);
            return _context.SaveChanges();
        }
    }
}
