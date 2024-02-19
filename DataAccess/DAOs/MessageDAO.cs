using BussinessObject.Interfaces;
using BussinessObject.Models;
using DataAccess.Repositories;
using DataAccess.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Net.NetworkInformation;

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
        public List<Message> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.Messages.ToList(); ;
        }
        public Message? Get(int? messageId)
        {
            _ = messageId ?? throw new Exception("Message id is null");
            using var _context = new ChatApplicationContext();
            return _context.Messages.SingleOrDefault(m => m.MessageId == messageId); ;
        }
        //This function need more testing to be precise
        public List<IMessage> GetLastestLastMessageList(int? userId)
        {
            using var _context = new ChatApplicationContext();
            IIndividualMessageRepository individualMessageRepository = new IndividualMessageRepository();
            IGroupMessageRepository groupMessageRepository = new GroupMessageRepository();
            var imList = individualMessageRepository.GetLast(userId);
            var gmList = groupMessageRepository.GetLastByUserId(userId);

            var lastMessageList = new List<IMessage>();
            lastMessageList.AddRange(imList);
            lastMessageList.AddRange(gmList);
            return lastMessageList.OrderByDescending(m => m.Message.Time).ToList();
        }
        public int Add(Message message)
        {
            _ = message ?? throw new Exception("Message is null! Abort adding message operation");
            using var _context = new ChatApplicationContext();
            _context.Messages.Add(message);
            return _context.SaveChanges();
        }
        public int Update(Message updateMessage)
        {
            _ = updateMessage ?? throw new Exception("Update message is null! Abort updating message operation");
            var oldMessage = Get(updateMessage.MessageId) ?? throw new Exception("Message not found! Abort updating message operation");
            using var _context = new ChatApplicationContext();
            _context.Entry(oldMessage).CurrentValues.SetValues(updateMessage);
            return _context.SaveChanges();
        }
        public int Delete(int? messageId)
        {
            _ = messageId ?? throw new Exception("Update message is null! Abort updating message operation");
            var message = Get(messageId) ?? throw new Exception("Message not found! Abort updating message operation");
            using var _context = new ChatApplicationContext();
            _context.Messages.Remove(message);
            return _context.SaveChanges();
        }
    }
}
