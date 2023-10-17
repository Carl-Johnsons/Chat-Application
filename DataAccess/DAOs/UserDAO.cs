using BussinessObject.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    internal class UserDAO
    {
        //using singleton to access db by one instance variable
        private static UserDAO instance = null;
        private static readonly object instanceLock = new object();
        private UserDAO() { }
        public static UserDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new UserDAO();
                    }
                    return instance;
                }
            }
        }

        public IEnumerable<User> GetUserList()
        {
            using var context = new ChatApplicationContext();
            var users = context.Users.Include(u => u.GroupGroupDeputies).Include(u => u.GroupGroupLeaders).Include(u => u.Messages).ToList();
            return users;
        }

        public User GetUserByID(int userId)
        {
            User user = null;
            try
            {
                using var context = new ChatApplicationContext();
                user = context.Users.SingleOrDefault(u => u.UserId == userId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return user;
        }

        public int AddUser(User user)
        {

            User _user = GetUserByID(user.UserId);
            if (_user == null)
            {
                using var context = new ChatApplicationContext();
                context.Users.Add(user);
                context.SaveChanges();

                return context.SaveChanges();
            }
            else
            {
                return 0;
            }

        }

        public int UpdateUser(User userUpdate)
        {
            if (userUpdate == null)
            {
                return 0;
            }
            using var context = new ChatApplicationContext();
            var user = GetUserByID(userUpdate.UserId);
            if (user == null)
            {
                return 0;
            }
            user.UserId = userUpdate.UserId;

            context.Users.Update(userUpdate);

            return context.SaveChanges();
        }

        public int RemoveUser(int userId)
        {

            User user = GetUserByID(userId);
            if (user != null)
            {
                using var context = new ChatApplicationContext();
                context.Users.Remove(user);
                return context.SaveChanges();
            }
            else
            {
                return 0;
            }
        }

    }

}
}
