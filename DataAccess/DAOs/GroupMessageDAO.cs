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
        public List<GroupMessage> Get(int? groupId)
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
        public List<GroupMessage> Get(int? groupId, int skipBatch)
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

        public List<GroupMessage> GetLastByUserId(int? senderId)
        {
            using var _context = new ChatApplicationContext();
            var gmList = (
                            from table1 in (
                                 from gm in _context.GroupMessages
                                 join m in _context.Messages on gm.MessageId equals m.MessageId into msgGroup
                                 from message in msgGroup
                                 where _context.GroupUser.Any(gu => gu.UserId == senderId && gu.GroupId == gm.GroupReceiverId)
                                 group new { gm, message } by gm.GroupReceiverId into grouped
                                 select new
                                 {
                                     Group_Receiver_ID = grouped.Key,
                                     LatestTime = grouped.Max(g => g.message.Time)
                                 }
                            )
                            join table2 in (
                                 from gm in _context.GroupMessages
                                 join m in _context.Messages
                                 on gm.MessageId equals m.MessageId into msgGroup
                                 from m in msgGroup
                                 select new
                                 {
                                     gm,
                                     m
                                 }
                            ) 
                            on new { table1.Group_Receiver_ID, table1.LatestTime }
                            equals new { Group_Receiver_ID = table2.gm.GroupReceiverId, LatestTime = table2.m.Time }
                            select new GroupMessage
                            {
                                GroupReceiverId = table2.gm.GroupReceiverId,
                                MessageId = table2.m.MessageId,
                                Message = table2.m
                            }
                          ).ToList();
            return gmList;
        }
        public GroupMessage? GetLastByGroupId(int? groupId)
        {
            validation.EnsureGroupIdNotNull(groupId);
            using var _context = new ChatApplicationContext();
            return _context.GroupMessages
                            .Include(gm => gm.Message)
                            .Where(gm => gm.GroupReceiverId == groupId)
                            .OrderByDescending(gm => gm.MessageId)
                            .FirstOrDefault();
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
