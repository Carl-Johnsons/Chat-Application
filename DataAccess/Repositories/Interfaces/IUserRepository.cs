using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.Repositories.Interfaces
{
    public interface IUserRepository
    {
        public List<User> Get() ;
        public User? Get(int? userId);
        public User? GetByPhoneNumber(string? phoneNumber);
        public User? GetByRefreshToken(string? refreshToken);
        public User? GetByPhoneNumberAndPassword(string? phoneNumber, string? password);
        public int Add(User? user);
        public int Update(User? userUpdate);
        public int Delete(int? userId);
    }
}
