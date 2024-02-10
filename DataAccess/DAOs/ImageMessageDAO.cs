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
        private readonly ChatApplicationContext _context = new();
        public List<ImageMessage> Get()
        {
            return _context.ImageMessages.ToList();
        }
        public ImageMessage? Get(int? messageId)
        {
            if (messageId == null)
            {
                throw new Exception("message id is null");
            }
            return _context.ImageMessages.SingleOrDefault(img => img.MessageId == messageId);

        }
        public int Add(ImageMessage imageMessage)
        {
            _context.ImageMessages.Add(imageMessage);
            return _context.SaveChanges();
        }
        public int Delete(int messageId)
        {
            var message = Get(messageId) ?? throw new Exception("Image message not found! Aborting delete operation");
            _context.ImageMessages.Remove(message);
            return _context.SaveChanges();
        }
    }
}
