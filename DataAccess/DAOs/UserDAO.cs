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

        private readonly ChatApplicationContext _context = new();

        public List<User> Get()
        {
            return _context.Users.ToList();
        }

        public User? Get(int? userId)
        {
            _ = userId ?? throw new Exception("user id is null");
            return _context.Users.SingleOrDefault(u => u.UserId == userId);
        }
        public User? GetByPhoneNumber(string? phoneNumber)
        {
            _ = phoneNumber ?? throw new Exception("Phone number is null");
            return _context.Users.SingleOrDefault(u => u.PhoneNumber == phoneNumber);
        }
        public User? GetByRefreshToken(string? refreshToken)
        {
            _ = refreshToken ?? throw new Exception("refresh token is null");
            return _context.Users.SingleOrDefault(u => u.RefreshToken == refreshToken);
        }
        public User? GetByPhoneNumberAndPassword(string? phoneNumber, string? password)
        {
            if (phoneNumber == null || password == null)
            {
                return null;
            }
            return _context.Users
                            .SingleOrDefault(u => u.PhoneNumber == phoneNumber
                                            && u.Password == password);
        }
        public int Add(User? user)
        {
            _ = user ?? throw new Exception("User is null! Aborting add operation");
            _context.Users.Add(user);
            return _context.SaveChanges();
        }
        public int Update(User? userUpdate)
        {
            _ = userUpdate ?? throw new Exception("User is null! Aborting update operation");
            var oldUser = Get(userUpdate.UserId) ?? throw new Exception("User is null! Aborting update operation");
            //References: https://stackoverflow.com/questions/46657813/how-to-update-record-using-entity-framework-core
            _context.Entry(oldUser).CurrentValues.SetValues(userUpdate);
            return _context.SaveChanges();
        }

        public int Delete(int? userId)
        {
            _ = userId ?? throw new Exception("user id can't be null");
            var user = Get(userId)
                        ?? throw new Exception("User is null! Aborting delete operation");
            _context.Users.Remove(user);
            return _context.SaveChanges();
        }

    }
}
