using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    public class IndividualMessageDAO
    {
        private static IndividualMessageDAO? instance = null;
        private static readonly object instanceLock = new();
        public static IndividualMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new IndividualMessageDAO();
                    return instance;
                }

            }
        }
        private readonly ChatApplicationContext _context = new();

        public List<IndividualMessage> Get()
        {
            return _context.IndividualMessages.Include(im => im.Message).ToList();
        }
        public List<IndividualMessage> Get(int senderId, int receiverId)
        {
            var individualMessages = _context.IndividualMessages
                .Include(im => im.Message)
                .Where(im =>
                    (im.Message.SenderId == senderId && im.UserReceiverId == receiverId)
                    || (im.Message.SenderId == receiverId && im.UserReceiverId == senderId))
                .ToList();
            return individualMessages;
        }
        public IndividualMessage? GetLastMessage(int senderId, int receiverId)
        {
            var individualMessages = Get(senderId, receiverId);
            if (individualMessages == null || individualMessages.Count == 0)
            {
                return null;
            }
            return individualMessages[individualMessages.Count - 1];
        }
        public int Add(IndividualMessage individualMessage)
        {
            if (individualMessage == null)
            {
                throw new Exception("individual message is null");
            }
            _context.IndividualMessages.Add(individualMessage);
            return _context.SaveChanges();
        }
        public int Update(IndividualMessage individualMessage)
        {
            var oldMessage = MessageDAO.Instance.Get(individualMessage.MessageId) ?? throw new Exception("Individual message is null! Aborting update operation");
            _context.Entry(oldMessage).CurrentValues.SetValues(individualMessage);
            return _context.SaveChanges();
        }
        public int Delete(int messageId)
        {
            _ = MessageDAO.Instance.Get(messageId) ?? throw new Exception("Individual message is null! Aborting delete operation");
            return MessageDAO.Instance.Delete(messageId);
        }
    }
}

