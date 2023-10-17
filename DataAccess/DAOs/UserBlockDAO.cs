using BussinessObject.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace DataAccess.DAOs
{
    public class UserBlockDAO : ChatApplicationContext
    {
        //using singleton to access db by one instance variable
        private static UserBlockDAO instance = null;
        private static readonly object instanceLock = new object();
        private UserBlockDAO() { }
        public static UserBlockDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new UserBlockDAO();
                    }
                    return instance;
                }
            }
        }

        public IEnumerable<UserBlock> GetBlockedUserList()
        {
            using var context = new ChatApplicationContext();
            var usersBlocked = context.UserBlocks.Include( ub => ub.BlockedUser).Include( ub => ub.User ).ToList();
            return usersBlocked;
        }

        public UserBlock GetBlockedUserByID(int blockedUserId)
        {
            UserBlock userBlock = null;
            try
            {
                using var context = new ChatApplicationContext();
                userBlock = context.UserBlocks.SingleOrDefault(u => u.BlockedUserId == blockedUserId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return userBlock;
        }

        public int AddUserBlock(UserBlock userBlock)
        {

            if (userBlock == null)
            {
                using var context = new ChatApplicationContext();

                context.UserBlocks.Add(userBlock);
                return context.SaveChanges();

            }
            else
            {
                return 0;
            }
            
        }

        public int UpdateUserBlock(UserBlock updateUserBlock)
        {
            if (updateUserBlock == null)
            {
                return 0;
            }
            using var context = new ChatApplicationContext();
            var userBlock = GetBlockedUserByID(updateUserBlock.UserId);
            if (userBlock == null)
            {
                throw new Exception("User not exist");
            }
            userBlock.BlockedUserId = updateUserBlock.BlockedUserId;
            
            context.UserBlocks.Update(userBlock);
            
            return context.SaveChanges();
        }

        public int RemoveUserBlocked(int blockedUserID)
        {
            UserBlock userblocked = GetBlockedUserByID(blockedUserID);
            if (userblocked != null)
            {
                using var context = new ChatApplicationContext();
                context.UserBlocks.Remove(userblocked);
                return context.SaveChanges();
            }
            else
            {
                return 0;
            }
        }
    }
}
