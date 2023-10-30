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
        private static IndividualMessageDAO instance = null;
        private static readonly object instanceLock = new object();
        public static IndividualMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new IndividualMessageDAO();
                    }
                    return instance;
                }

            }
        }
        public IEnumerable<IndividualMessage> Get()
        {
            using var context = new ChatApplicationContext();
            var individualMessages = context.IndividualMessages.Include(im => im.Message).ToList();
            return individualMessages;
        }
        public IEnumerable<IndividualMessage> Get(int senderId, int receiverId)
        {
            using var context = new ChatApplicationContext();
            var individualMessages = context.IndividualMessages
                .Include(im => im.Message)
                .Where(im =>
                (im.Message.SenderId == senderId && im.UserReceiverId == receiverId)
                || (im.Message.SenderId == receiverId && im.UserReceiverId == senderId))
                .ToList();
            return individualMessages;
        }
        public int Add(IndividualMessage individualMessage)
        {
            try
            {
                if (individualMessage == null)
                {
                    return 0;
                }

                using var context = new ChatApplicationContext();
                context.IndividualMessages.Add(individualMessage);
                return context.SaveChanges();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
            }
        }

        public int Update(IndividualMessage individualMessage)
        {

            try
            {
                Message _message = MessageDAO.Instance.Get(individualMessage.MessageId);
                if (_message != null)
                {
                    using var context = new ChatApplicationContext();
                    context.IndividualMessages.Update(individualMessage);
                    return context.SaveChanges();
                }
                else
                {
                    throw new Exception("The individual message does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public int Delete(int messageId)
        {
            return MessageDAO.Instance.Delete(messageId);
        }
    }
}

