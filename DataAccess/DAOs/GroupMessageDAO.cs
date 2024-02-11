using BussinessObject.Models;
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
        public List<GroupMessage> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.GroupMessages
                   .Include(gm => gm.Message)
                   .ToList();
        }

        public List<GroupMessage> GetByGroupId(int? groupId)
        {
            using var _context = new ChatApplicationContext();
            if (groupId == null)
            {
                throw new Exception("Group id is null");
            }
            var groupMessages = _context.GroupMessages
                                .Include(gm => gm.Message)
                                .Where(gm => gm.GroupReceiverId == groupId)
                                .ToList();
            return groupMessages;
        }
        public GroupMessage? GetByMessageId(int? messageId)
        {
            using var _context = new ChatApplicationContext();
            _ = messageId ?? throw new Exception("Message id is null");
            var groupMessage = _context.GroupMessages
                                    .SingleOrDefault(gm => gm.MessageId == messageId);
            return groupMessage;

        }
        public int Add(GroupMessage groupMessage)
        {
            using var _context = new ChatApplicationContext();
            _context.GroupMessages.Add(groupMessage);
            return _context.SaveChanges();
        }
        public int Update(GroupMessage groupMessage)
        {
            using var _context = new ChatApplicationContext();
            var oldMessage = GetByMessageId(groupMessage.MessageId) 
                    ?? throw new Exception("Group message not found! Aborting update operation");
            _context.Entry(oldMessage).CurrentValues.SetValues(groupMessage);
            return _context.SaveChanges();
        }
        public int Delete(int messageId)
        {
            using var _context = new ChatApplicationContext();
            var message = GetByMessageId(messageId) 
                    ?? throw new Exception("Group message not found! Aborting delete operation");
            _context.GroupMessages.Remove(message);
            return _context.SaveChanges();

        }
    }
}
