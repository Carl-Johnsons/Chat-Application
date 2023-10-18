using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    public class GroupMessageDAO
    {
        private static GroupMessageDAO instance = null;
        private static readonly object instanceLock = new object();
        public static GroupMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new GroupMessageDAO();
                    }
                    return instance;
                }

            }
        }
        public List<GroupMessage> GetGroupMessages()
        {
            using var context = new ChatApplicationContext();
            var groupMessages = context.GroupMessages.ToList();
            return groupMessages;
        }
        public GroupMessage GetGroupMessageByID(int MessageId)
        {
            GroupMessage groupMessage = null;
            try
            {
                using var context = new ChatApplicationContext();
                groupMessage = context.GroupMessages.SingleOrDefault(gm => gm.MessageId == MessageId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return groupMessage;

        }
        public void AddMessage(GroupMessage groupMessage)
        {

            try
            {
                GroupMessage _groupMessage = GetGroupMessageByID(groupMessage.MessageId);
                if (_groupMessage == null)
                {
                    using var context = new ChatApplicationContext();
                    context.GroupMessages.Add(groupMessage);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group message is already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public void UpdateMessage(GroupMessage groupMessage)
        {

            try
            {
                GroupMessage _groupMessage = GetGroupMessageByID(groupMessage.MessageId);
                if (_groupMessage != null)
                {
                    using var context = new ChatApplicationContext();
                    context.GroupMessages.Update(groupMessage);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group message does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public void DeleteMessage(int messageId)
        {

            try
            {
                GroupMessage _groupMessage = GetGroupMessageByID(messageId);
                if (_groupMessage != null)
                {
                    using var context = new ChatApplicationContext();
                    context.GroupMessages.Remove(_groupMessage);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The group message does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
