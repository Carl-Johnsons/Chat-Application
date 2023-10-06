using SmallChatApplication.DatabaseContext;
using SmallChatApplication.Models;
using SmallChatApplication.Helpers;
using SmallChatApplication.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace SmallChatApplication.Repositories
{
    public class UserRepository : IUserRepository
    {
        ChatApplicationContext _context;
        public UserRepository()
        {
            _context = new ChatApplicationContext();
        }

        //Create
        public bool AddUser(Users? newUser)
        {
            if (newUser == null)
            {
                return false;
            }
            if (IsDuplication(newUser))
            {
                return false;
            }
            newUser.Password = Helpers.PasswordHasher.GenerateMD5Hash(newUser.Password);

            _context.Users.Add(newUser);
            int affectedRow = _context.SaveChanges();
            return affectedRow > 0;
        }
        //READ
        public Users GetUsers(int userID)
        {
            var user = _context.Users.SingleOrDefault(u =>
                u.UserID == userID);

            return user ?? throw new AccountNotFoundException();
        }
        public Users GetUsers(string? Phone, string? Password)
        {
            if (Phone == null || Password == null)
            {
                throw new AccountNotFoundException();
            }

            string HashPassword = PasswordHasher.GenerateMD5Hash(Password);
            var user = _context.Users.SingleOrDefault(u =>
                u.Phone == Phone
                && u.Password == HashPassword);

            return user ?? throw new AccountNotFoundException();
        }
        public Users GetActiveUsers(string? Phone, string? Password)
        {

            var user = GetUsers(Phone, Password);
            if (!user.Active)
            {
                throw new AccountDisabledException();
            }
            return user;
        }
        public bool IsDuplication(Users user)
        {
            if (user == null)
            {
                return true;
            }
            if (IsExistPhone(user.Phone))
            {
                return true;
            }
            return false;
        }
        public bool IsExistPhone(string? Phone)
        {
            if (Phone == null)
            {
                return false;
            }
            var user = _context.Users.SingleOrDefault(u => u.Phone == Phone);

            return user != null;
        }
        //UPDATE
        public bool UpdateUser(Users updatedUser)
        {
            if (updatedUser == null)
            {
                return false;
            }
            var user = _context.Users.SingleOrDefault(u => u.UserID == updatedUser.UserID);

            if (user == null)
            {
                return false;
            }


            _context.Users.Entry(user).CurrentValues.SetValues(updatedUser);
            int affectedRow = _context.SaveChanges();
            return affectedRow > 0;
        }
        public bool EnableUser(int userID)
        {
            var user = GetUsers(userID);
            user.Active = true;
            return UpdateUser(user);
        }
        //DELETE
        public bool DisableUser(int userID)
        {
            var user = GetUsers(userID);
            user.Active = false;
            return UpdateUser(user);
        }


    }
}
