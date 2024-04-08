using AuthService.Core.Entities;

namespace AuthService.Infrastructure.DAOs;

public class UserDAO
{
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
        using var _context = new ApplicationDbContext();
        return [.. _context.Users];
    }
    public User? Get(int id)
    {
        using var _context = new ApplicationDbContext();
        return _context.Users.Where(u => u.Id == id).SingleOrDefault();
    }
    public void Add(User userToAdd)
    {
        using var _context = new ApplicationDbContext();
        var oldUser = Get(userToAdd.Id);
        if (oldUser != null)
        {
            throw new Exception("User already exist");
        }
        var account = _context.Accounts
                          .Where(acc => acc.PhoneNumber == userToAdd.Account.PhoneNumber)
                          .SingleOrDefault();
        if (account != null)
        {
            throw new Exception("phone number already exist");
        }
        _context.Users.Add(userToAdd);
        _context.SaveChanges();
    }
    public void Update(User userToUpdate)
    {
        using var _context = new ApplicationDbContext();
        var oldUser = Get(userToUpdate.Id);
        if (oldUser == null)
        {
            throw new Exception("User not found");
        }
        _context.Users.Update(userToUpdate);
        _context.SaveChanges();
    }
    public void Delete(int id)
    {
        using var _context = new ApplicationDbContext();
        var oldUser = Get(id);
        if (oldUser == null)
        {
            throw new Exception("User not found");
        }
        _context.Users.Remove(oldUser);
        _context.SaveChanges();
    }
}
