using BussinessObject.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    public class MessageDAO
    {
        //using singleton to access db by one instance variable
        private static MessageDAO instance = null;
        private static readonly object instanceLock = new object();
        private MessageDAO() { }
        public static MessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new MessageDAO();
                    }
                    return instance;
                }
            }
        }

        public IEnumerable<Message> GetMessageList()
        {
            using var context = new ChatApplicationContext();
            var messages = context.Messages.ToList();
            return messages;
        }
        public IEnumerable<IndividualMessage> GetIndividualMessageList()
        {
            using var context = new ChatApplicationContext();
            var individualMessages = context.IndividualMessages.Include(im => im.Message).ToList();
            return individualMessages;
        }

        public Message GetMessageByID(int messageId)
        {
            Message message = null;
            try
            {
                using var context = new ChatApplicationContext();
                message = context.Messages.SingleOrDefault(m => m.MessageId == messageId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return message;
        }

        public int AddMessage(Message message)
        {
            if (message == null)
            {
                return 0;
            }
            Console.WriteLine("Message Id is :" + message.MessageId);

            using var context = new ChatApplicationContext();
            context.Messages.Add(message);
            return context.SaveChanges();
        }

        public int AddIndividualMessage(IndividualMessage individualMessage)
        {
            try
            {
                if (individualMessage == null)
                {
                    return 0;
                }

                Console.WriteLine("individual message is " + individualMessage);
                Console.WriteLine("Message is " + individualMessage.Message);
                //int result = AddMessage(individualMessage.Message);
                //if (result == 0)
                //{
                //    throw new Exception("Add individual message failed");
                //}
                return IndividualMessageDAO.Instance.Add(individualMessage);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.InnerException.Message);
            }


        }

        public int UpdateMessage(Message messageUpdate)
        {
            if (messageUpdate == null)
            {
                return 0;
            }
            using var context = new ChatApplicationContext();
            var message = GetMessageByID(messageUpdate.MessageId);
            if (message == null)
            {
                return 0;
            }
            message.MessageId = messageUpdate.MessageId;

            context.Messages.Update(messageUpdate);

            return context.SaveChanges();
        }

        public int DeleteMessage(int messageId)
        {
            try
            {
                Message mess = GetMessageByID(messageId);
                if (mess != null)
                {
                    using var context = new ChatApplicationContext();
                    context.Messages.Remove(mess);
                    return context.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public int DeleteIndividualMessage(int messageId)
        {
            int result = IndividualMessageDAO.Instance.DeleteIndividualMessage(messageId);
            if (result < 1)
            {
                throw new Exception("Deleted failed");
            }
            return DeleteMessage(messageId);


        }
    }
}
