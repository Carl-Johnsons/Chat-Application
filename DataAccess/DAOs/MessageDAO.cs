using BussinessObject.Models;

namespace DataAccess.DAOs
{
    public class MessageDAO
    {
        //using singleton to access db by one instance variable
        private static MessageDAO? instance = null;
        private static readonly object instanceLock = new();
        private MessageDAO() { }
        public static MessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new MessageDAO();
                    return instance;
                }
            }
        }
        private readonly ChatApplicationContext _context = new();
        public List<Message> Get()
        {
            return _context.Messages.ToList(); ;
        }
        public Message? Get(int? messageId)
        {
            _ = messageId ?? throw new Exception("Message id is null");
            return _context.Messages.SingleOrDefault(m => m.MessageId == messageId); ;
        }
        public int Add(Message message)
        {
            _ = message ?? throw new Exception("Message is null! Abort adding message operation");
            _context.Messages.Add(message);
            return _context.SaveChanges();
        }
        public int Update(Message updateMessage)
        {
            _ = updateMessage ?? throw new Exception("Update message is null! Abort updating message operation");
            var oldMessage= Get(updateMessage.MessageId) ?? throw new Exception("Message not found! Abort updating message operation");
            _context.Entry(oldMessage).CurrentValues.SetValues(updateMessage);
            return _context.SaveChanges();
        }
        public int Delete(int? messageId)
        {
            _ = messageId ?? throw new Exception("Update message is null! Abort updating message operation");
            var message = Get(messageId) ?? throw new Exception("Message not found! Abort updating message operation");
            _context.Messages.Remove(message);
            return _context.SaveChanges();
        }
    }
}
