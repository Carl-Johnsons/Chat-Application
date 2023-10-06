using SmallChatApplication.Models;

namespace SmallChatApplication.Repositories
{
    public interface IUserRepository
    {
        //CREATE
        public bool AddUser(Users user);
        //READ
        public Users GetUsers(int userID);
        public Users GetUsers(string? Phone, string? Password);
        public Users GetActiveUsers(string? Phone, string? Password);
        public bool IsDuplication(Users user);
        public bool IsExistPhone(string Phone);
        //Update
        public bool UpdateUser(Users user);
        public bool EnableUser(int userID);
        //DELETE
        public bool DisableUser(int userID);

    }
}
