﻿using BussinessObject.Models;
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

        public IEnumerable<Message> Get()
        {
            using var context = new ChatApplicationContext();
            var messages = context.Messages.ToList();
            return messages;
        }


        public Message Get(int messageId)
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

        public int Add(Message message)
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



        public int Update(Message messageUpdate)
        {
            if (messageUpdate == null)
            {
                return 0;
            }
            using var context = new ChatApplicationContext();
            var message = Get(messageUpdate.MessageId);
            if (message == null)
            {
                return 0;
            }
            message.MessageId = messageUpdate.MessageId;

            context.Messages.Update(messageUpdate);

            return context.SaveChanges();
        }

        public int Delete(int messageId)
        {
            try
            {
                Message mess = Get(messageId);
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

    }
}
