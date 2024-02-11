using BussinessObject.Models;

namespace DataAccess.DAOs
{
    internal class UserDAO
    {
        //using singleton to access db by one instance variable
        private static UserDAO? instance = null;
        private static readonly object instanceLock = new();
        private UserDAO() { }
        public static UserDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    instance ??= new UserDAO();
                    return instance;
                }
            }
        }
        public List<User> Get()
        {
            using var _context = new ChatApplicationContext();
            return _context.Users.ToList();
        }

        public User? Get(int? userId)
        {
            _ = userId ?? throw new Exception("user id is null");
            using var _context = new ChatApplicationContext();
            return _context.Users.SingleOrDefault(u => u.UserId == userId);
        }
        public User? GetByPhoneNumber(string? phoneNumber)
        {
            _ = phoneNumber ?? throw new Exception("Phone number is null");
            using var _context = new ChatApplicationContext();
            return _context.Users.SingleOrDefault(u => u.PhoneNumber == phoneNumber);
        }
        public User? GetByRefreshToken(string? refreshToken)
        {
            _ = refreshToken ?? throw new Exception("refresh token is null");
            using var _context = new ChatApplicationContext();
            var user = _context.Users.SingleOrDefault(u => u.RefreshToken == refreshToken);
            return user;
        }
        public User? GetByPhoneNumberAndPassword(string? phoneNumber, string? password)
        {
            if (phoneNumber == null || password == null)
            {
                return null;
            }
            using var _context = new ChatApplicationContext();
            return _context.Users
                            .SingleOrDefault(u => u.PhoneNumber == phoneNumber
                                            && u.Password == password);
        }
        public int Add(User? user)
        {
            _ = user ?? throw new Exception("User is null! Aborting add operation");
            using var _context = new ChatApplicationContext();
            _context.Users.Add(user);
            return _context.SaveChanges();
        }
        // Fix later, There is something wrong when updating the refresh token attribute
        public int Update(User? userUpdate)
        {
            _ = userUpdate ?? throw new Exception("User is null! Aborting update operation");
            var oldUser = Get(userUpdate.UserId) ?? throw new Exception("User is null! Aborting update operation");
            using var _context = new ChatApplicationContext();
            //References: https://stackoverflow.com/questions/46657813/how-to-update-record-using-entity-framework-core
            _context.Entry(oldUser).CurrentValues.SetValues(userUpdate);
            _context.Users.Update(oldUser);
            return _context.SaveChanges();
        }

        public int Delete(int? userId)
        {
            _ = userId ?? throw new Exception("user id can't be null");
            var user = Get(userId)
                        ?? throw new Exception("User is null! Aborting delete operation");
            using var _context = new ChatApplicationContext();
            _context.Users.Remove(user);
            return _context.SaveChanges();
        }

    }
}
