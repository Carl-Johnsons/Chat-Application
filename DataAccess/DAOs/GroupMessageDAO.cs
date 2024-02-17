using BussinessObject.Constants;
using BussinessObject.Models;
using DataAccess.Utils;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class GroupMessageDAO
    {
        private static GroupMessageDAO? instance = null;
        private static readonly object instanceLock = new();
        public static GroupMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new GroupMessageDAO();
                    return instance;
                }

            }
        }
        private readonly ValidationUtils validation;
        private GroupMessageDAO()
        {
            validation = new ValidationUtils();
        }
        public List<GroupMessage> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.GroupMessages
                   .Include(gm => gm.Message)
                   .ToList();
        }
        public List<GroupMessage> GetByGroupId(int? groupId)
        {
            validation.EnsureGroupIdNotNull(groupId);
            using var _context = new ChatApplicationContext();
            var groupMessages = _context.GroupMessages
                                .Include(gm => gm.Message)
                                .Where(gm => gm.GroupReceiverId == groupId)
                                .OrderByDescending(gm => gm.MessageId)
                                .Take(MessageConstant.LIMIT)
                                .OrderBy(gm => gm.MessageId)
                                .ToList();
            return groupMessages;
        }
        public List<GroupMessage> GetByGroupId(int? groupId, int skipBatch)
        {
            validation.EnsureGroupIdNotNull(groupId);
            using var _context = new ChatApplicationContext();
            var groupMessages = _context.GroupMessages
                                .Include(gm => gm.Message)
                                .Where(gm => gm.GroupReceiverId == groupId)
                                .OrderByDescending(gm => gm.MessageId)
                                .Skip(skipBatch * MessageConstant.LIMIT)
                                .Take(MessageConstant.LIMIT)
                                .OrderBy(gm => gm.MessageId)
                                .ToList();
            return groupMessages;
        }
        public GroupMessage? GetByMessageId(int? messageId)
        {
            validation.EnsureMessageIdNotNull(messageId);
            using var _context = new ChatApplicationContext();
            var groupMessage = _context.GroupMessages
                                    .SingleOrDefault(gm => gm.MessageId == messageId);
            return groupMessage;

        }
        public int Add(GroupMessage? groupMessage)
        {
            validation.EnsureGroupMessageNotNull(groupMessage);
            validation.EnsureGroupExisted(groupMessage.GroupReceiverId);
            validation.EnsureUserExisted(groupMessage.Message.SenderId);
            validation.EnsureGroupUserExisted(groupMessage.GroupReceiverId, groupMessage.Message.SenderId);
            using var _context = new ChatApplicationContext();
            _context.GroupMessages.Add(groupMessage);
            return _context.SaveChanges();
        }
        public int Update(GroupMessage? groupMessage)
        {
            validation.EnsureGroupMessageNotNull(groupMessage);
            var oldMessage = GetByMessageId(groupMessage.MessageId)
                    ?? throw new Exception("Group message not found! Aborting update operation");
            using var _context = new ChatApplicationContext();
            _context.Entry(oldMessage).CurrentValues.SetValues(groupMessage);
            _context.GroupMessages.Update(oldMessage);
            return _context.SaveChanges();
        }
        public int Delete(int? messageId)
        {
            using var _context = new ChatApplicationContext();
            var message = GetByMessageId(messageId)
                    ?? throw new Exception("Group message not found! Aborting delete operation");
            _context.GroupMessages.Remove(message);
            return _context.SaveChanges();
        }
    }
}
