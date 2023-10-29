using BussinessObject.Models;
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
        public IEnumerable<IndividualMessage> GetIndividualMessageList()
        {
            using var context = new ChatApplicationContext();
            var individualMessages = context.IndividualMessages.ToList();
            return individualMessages;
        }
        public IndividualMessage GetIndividualMessageByID(int messageId)
        {
            IndividualMessage individualMessage = null;
            try
            {
                using var context = new ChatApplicationContext();
                individualMessage = context.IndividualMessages.SingleOrDefault(im => im.MessageId == messageId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return individualMessage;

        }
        public int Add(IndividualMessage individualMessage)
        {

            try
            {
                IndividualMessage _individualMessage = GetIndividualMessageByID(individualMessage.MessageId);
                if (_individualMessage == null)
                {
                    using var context = new ChatApplicationContext();
                    context.IndividualMessages.Add(individualMessage);
                    return context.SaveChanges();
                }
                else
                {
                    throw new Exception("The individual message is already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public int UpdateIndividualMessage(IndividualMessage individualMessage)
        {

            try
            {
                IndividualMessage _individualMessage = GetIndividualMessageByID(individualMessage.MessageId);
                if (_individualMessage != null)
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
        public int DeleteIndividualMessage(int messageId)
        {

            try
            {
                IndividualMessage _individualMessage = GetIndividualMessageByID(messageId);
                if (_individualMessage != null)
                {
                    using var context = new ChatApplicationContext();
                    context.IndividualMessages.Remove(_individualMessage);
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
    }
}

