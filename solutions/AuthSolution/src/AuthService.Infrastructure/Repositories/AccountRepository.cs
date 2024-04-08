using AuthService.Core.Entities;
using AuthService.Infrastructure.DAOs;

namespace AuthService.Infrastructure.Repositories;

public class AccountRepository
{
    private readonly AccountDAO Instance = AccountDAO.Instance;
    public List<Account> Get() => Instance.Get();
    public Account? Get(int id) => Instance.Get(id);
    public Account? Get(string phoneNumber, string password) => Instance.Get(phoneNumber, password);
    public void Add(Account accountToAdd) => Instance.Add(accountToAdd);
    public void Update(Account accountToUpdate) => Instance.Update(accountToUpdate);
}
