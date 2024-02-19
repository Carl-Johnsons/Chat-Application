using BussinessObject.Constants;
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

        public List<IndividualMessage> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.IndividualMessages.Include(im => im.Message).ToList();
        }
        public List<IndividualMessage> Get(int senderId, int receiverId)
        {
            using var _context = new ChatApplicationContext();
            var individualMessages = _context.IndividualMessages
                .Include(im => im.Message)
                .Where(im =>
                    (im.Message.SenderId == senderId && im.UserReceiverId == receiverId)
                    || (im.Message.SenderId == receiverId && im.UserReceiverId == senderId))
                .OrderByDescending(im => im.MessageId)
                .Take(MessageConstant.LIMIT)
                .OrderBy(im => im.MessageId)
                .ToList();
            return individualMessages;
        }
        public List<IndividualMessage> Get(int senderId, int receiverId, int skipBatch)
        {
            using var _context = new ChatApplicationContext();
            var individualMessages = _context.IndividualMessages
                .Include(im => im.Message)
                .Where(im =>
                    (im.Message.SenderId == senderId && im.UserReceiverId == receiverId)
                    || (im.Message.SenderId == receiverId && im.UserReceiverId == senderId))
                .OrderByDescending(im => im.MessageId)
                .Skip(skipBatch * MessageConstant.LIMIT)
                .Take(MessageConstant.LIMIT)
                .OrderBy(im => im.MessageId)
                .ToList();
            return individualMessages;
        }

        public List<IndividualMessage> GetLast(int? senderId)
        {
            using var _context = new ChatApplicationContext();
            var imList = (from table1 in (
                     from im in _context.IndividualMessages
                     join m in _context.Messages
                     on im.MessageId equals m.MessageId into msgGroup
                     from groupedMsg in msgGroup
                     where groupedMsg.SenderId == senderId || im.UserReceiverId == senderId
                     group new { im, groupedMsg } by new
                     {
                         UserId = groupedMsg.SenderId == senderId ? groupedMsg.SenderId : im.UserReceiverId,
                         OtherUserId = groupedMsg.SenderId == senderId ? im.UserReceiverId : groupedMsg.SenderId,
                     } into grouped
                     select new
                     {
                         grouped.Key.UserId,
                         grouped.Key.OtherUserId,
                         LatestTime = grouped.Max(x => x.groupedMsg.Time)
                     })
                          from table2 in (
                              from im in _context.IndividualMessages
                              join m in _context.Messages
                              on im.MessageId equals m.MessageId into msgGroup
                              from groupedMsg in msgGroup
                              select new
                              {
                                  im,
                                  m = groupedMsg
                              }
                          )
                          where (table1.UserId == table2.m.SenderId && table1.OtherUserId == table2.im.UserReceiverId && table1.LatestTime == table2.m.Time)
                                || (table1.OtherUserId == table2.m.SenderId && table1.UserId == table2.im.UserReceiverId && table1.LatestTime == table2.m.Time)
                          // 2 ways comparison
                          select new IndividualMessage
                          {
                              MessageId = table2.m.MessageId,
                              Read = table2.im.Read,
                              Status = table2.im.Status,
                              UserReceiverId = table2.im.UserReceiverId,
                              Message = table2.m
                          }).ToList();
            return imList;
        }

        // I think this query is not optimized
        public IndividualMessage? GetLast(int senderId, int receiverId)
        {
            using var _context = new ChatApplicationContext();
            return _context.IndividualMessages
                            .Include(im => im.Message)
                            .Where(im =>
                                (im.Message.SenderId == senderId && im.UserReceiverId == receiverId)
                                || (im.Message.SenderId == receiverId && im.UserReceiverId == senderId))
                            .OrderByDescending(im => im.MessageId)
                            .FirstOrDefault();
        }
        public int Add(IndividualMessage individualMessage)
        {
            if (individualMessage == null)
            {
                throw new Exception("individual message is null");
            }
            using var _context = new ChatApplicationContext();
            _context.IndividualMessages.Add(individualMessage);
            return _context.SaveChanges();
        }
        public int Update(IndividualMessage individualMessage)
        {
            var oldMessage = MessageDAO.Instance.Get(individualMessage.MessageId) ?? throw new Exception("Individual message is null! Aborting update operation");
            using var _context = new ChatApplicationContext();
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

