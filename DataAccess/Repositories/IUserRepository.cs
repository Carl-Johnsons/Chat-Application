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
        IEnumerable<User> GetUserList();
        User GetUserByID(int userId);
        int InsertUser(User user);
        int UpdateUser(User userUpdate);
        int DeleteUser(int userId);
    }
}
