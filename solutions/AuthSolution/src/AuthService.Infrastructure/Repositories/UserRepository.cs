
using AuthService.Core.Entities;
using AuthService.Infrastructure.DAOs;

namespace AuthService.Infrastructure.Repositories;

public class UserRepository
{
    private readonly UserDAO Instance = UserDAO.Instance;

    public List<User> Get() => Instance.Get();
    public User? Get(int id) => Instance.Get(id);
    public void Add(User userToAdd) => Instance.Add(userToAdd);
    public void Update(User userToUpdate) => Instance.Update(userToUpdate);
    public void Delete(int id) => Instance.Delete(id);
}
