using AuthService.Core.Entities;

namespace AuthService.Infrastructure.DAOs;

public class AccountDAO
{
    private static AccountDAO? instance = null;
    private static readonly object instanceLock = new();

    private AccountDAO() { }

    public static AccountDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new AccountDAO();
                return instance;
            }
        }
    }
    public List<Account> Get()
    {
        using var _context = new ApplicationDbContext();
        return [.. _context.Accounts];
    }
    public Account? Get(int id)
    {
        using var _context = new ApplicationDbContext();
        return _context.Accounts.Where(acc => acc.Id == id).SingleOrDefault();
    }
    public Account? Get(string phoneNumber, string password)
    {
        using var _context = new ApplicationDbContext();
        return _context.Accounts.Where(acc => acc.PhoneNumber == phoneNumber
                                                && acc.Password == password).SingleOrDefault();
    }
    public void Add(Account accountToAdd)
    {
        using var _context = new ApplicationDbContext();
        var oldAccount = Get(accountToAdd.Id);
        if (oldAccount != null)
        {
            throw new Exception("Account already exist");
        }
        _context.Accounts.Add(accountToAdd);
        _context.SaveChanges();
    }
    public void Update(Account accountToUpdate)
    {
        using var _context = new ApplicationDbContext();
        var oldAccount = Get(accountToUpdate.Id);
        if (oldAccount == null)
        {
            throw new Exception("Account not found");
        }
        _context.Accounts.Update(accountToUpdate);
        _context.SaveChanges();
    }
}
