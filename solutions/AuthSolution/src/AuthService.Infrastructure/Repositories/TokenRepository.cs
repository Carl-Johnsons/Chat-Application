
using AuthService.Core.Entities;
using AuthService.Infrastructure.DAOs;

namespace AuthService.Infrastructure.Repositories;

public class TokenRepository
{
    private readonly TokenDAO Instance = TokenDAO.Instance;
    public List<Token> Get() => Instance.Get();
    public Token? Get(int id) => Instance.Get(id);
    public Token? GetByRefreshToken(string refreshToken) => Instance.GetByRefreshToken(refreshToken);
    public void Add(Token tokenToAdd) => Instance.Add(tokenToAdd);
    public void Update(Token tokenToUpdate) => Instance.Update(tokenToUpdate);
    public void Delete(int id) => Instance.Delete(id);
}
