using BussinessObject.Models;
using DataAccess.DAOs;
using DataAccess.Repositories.Interfaces;

namespace DataAccess.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserDAO Instance = UserDAO.Instance;
        public List<User> Get() => Instance.Get();
        public User? Get(int? userId) => Instance.Get(userId);
        public User? GetByPhoneNumber(string? phoneNumber) => Instance.GetByPhoneNumber(phoneNumber);
        public User? GetByRefreshToken(string? refreshToken) => Instance.GetByRefreshToken(refreshToken);
        public User? GetByPhoneNumberAndPassword(string? phoneNumber, string? password) => Instance.GetByPhoneNumberAndPassword(phoneNumber, password);
        public int Add(User? user) => Instance.Add(user);
        public int Update(User? userUpdate) => Instance.Update(userUpdate);
        public int Delete(int? userId) => Instance.Delete(userId);

    }
}
