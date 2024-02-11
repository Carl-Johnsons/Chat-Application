using BussinessObject.Models;

namespace DataAccess.DAOs
{
    public class ImageMessageDAO
    {
        private static ImageMessageDAO? instance = null;
        private static readonly object instanceLock = new();
        public static ImageMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new ImageMessageDAO();
                    return instance;
                }

            }
        }
        public List<ImageMessage> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.ImageMessages.ToList();
        }
        public ImageMessage? Get(int? messageId)
        {
            if (messageId == null)
            {
                throw new Exception("message id is null");
            }
            using var _context = new ChatApplicationContext();
            return _context.ImageMessages.SingleOrDefault(img => img.MessageId == messageId);

        }
        public int Add(ImageMessage imageMessage)
        {
            using var _context = new ChatApplicationContext();
            _context.ImageMessages.Add(imageMessage);
            return _context.SaveChanges();
        }
        public int Delete(int messageId)
        {
            var message = Get(messageId) ?? throw new Exception("Image message not found! Aborting delete operation");
            using var _context = new ChatApplicationContext();
            _context.ImageMessages.Remove(message);
            return _context.SaveChanges();
        }
    }
}
