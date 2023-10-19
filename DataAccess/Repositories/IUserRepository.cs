using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories
{
    public interface IUserRepository
    {
        public IEnumerable<User> GetUserList();
        public User GetUserByID(int userId);
        public User? Login(string? phoneNumber, string? password);
        public User GetUserByPhoneNumber(string? phoneNumber);
        public int InsertUser(User user);
        public int UpdateUser(User userUpdate);
        public int DeleteUser(int userId);
    }
}
