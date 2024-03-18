

using BussinessObject.Constants;
using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.DAOs
{
    public class ConversationUsersDAO
    {
        private static ConversationUsersDAO? instance = null;
        private static readonly object instanceLock = new object();

        private ConversationUsersDAO() { }

        public static ConversationUsersDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new ConversationUsersDAO();
                    return instance;
                }
            }
        }
        public List<ConversationUser> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.ConversationUsers.ToList();
        }
        public ConversationUser? Get(int conversationId, int userId)
        {
            using var _context = new ChatApplicationContext();
            return _context.ConversationUsers
                           .SingleOrDefault(cu => cu.ConversationId == conversationId && cu.UserId == userId);
        }
        public List<ConversationUser> GetByConversationId(int conversationId)
        {
            using var _context = new ChatApplicationContext();
            return _context.ConversationUsers
                            .Where(cu => cu.ConversationId == conversationId)
                            .ToList();
        }
        public List<ConversationUser> GetByUserId(int userId)
        {
            using var _context = new ChatApplicationContext();
            var conversationUsers = _context.ConversationUsers
                            .Where(cu => cu.UserId == userId)
                            .Include(cu => cu.Conversation)
                            .ToList();
            var groupConversationIds = conversationUsers
                            .Where(cu => cu.Conversation.Type == ConversationType.GROUP)
                            .Select(cu => cu.ConversationId)
                            .ToList();
            var groupConversation = _context.GroupConversation
                                    .Where(gc => groupConversationIds.Contains(gc.Id))
                                    .ToList();
            foreach (var cu in conversationUsers)
            {
                if (cu.Conversation == null)
                {
                    continue;
                }
                if (cu.Conversation.Type == ConversationType.GROUP)
                {
                    cu.Conversation = groupConversation.FirstOrDefault(gc => gc.Id == cu.ConversationId, cu.Conversation);
                }
            }

            return conversationUsers;
        }
        public void Add(ConversationUser conversationUser)
        {
            using var _context = new ChatApplicationContext();
            _context.ConversationUsers.Add(conversationUser);
            _context.SaveChanges();
        }
        public void Delete(int conversationId, int userId)
        {
            using var _context = new ChatApplicationContext();
            var conversationUser = Get(conversationId, userId);
            if (conversationUser != null)
            {
                _context.ConversationUsers.Remove(conversationUser);
                _context.SaveChanges();
            };
        }
    }
}
