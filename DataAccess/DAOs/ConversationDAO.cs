

using BussinessObject.Models;

namespace DataAccess.DAOs
{
    public class ConversationDAO
    {
        private static ConversationDAO? instance = null;
        private static readonly object instanceLock = new object();

        private ConversationDAO() { }

        public static ConversationDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new ConversationDAO();
                    return instance;
                }
            }
        }
        public List<Conversation> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.Conversation.ToList();
        }
        public Conversation? Get(int id)
        {
            using var _context = new ChatApplicationContext();
            return _context.Conversation.SingleOrDefault(c => c.Id == id);
        }

        public void Add(Conversation conversation)
        {
            try
            {
                using var _context = new ChatApplicationContext();
                _context.Conversation.Add(conversation);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public void Update(Conversation conversation)
        {
            using var _context = new ChatApplicationContext();
            var oldConversation = Get(conversation.Id);
            if (oldConversation != null)
            {
                _context.Conversation.Update(conversation);
                _context.SaveChanges();
            };
        }
        public void Delete(int conversationId)
        {
            using var _context = new ChatApplicationContext();
            var conversation = Get(conversationId);
            if (conversation != null)
            {
                _context.Conversation.Remove(conversation);
                _context.SaveChanges();
            };
        }
    }
}
