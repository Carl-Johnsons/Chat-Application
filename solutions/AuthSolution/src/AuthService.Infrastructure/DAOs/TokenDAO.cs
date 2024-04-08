using AuthService.Core.Entities;

namespace AuthService.Infrastructure.DAOs;

public class TokenDAO
{
    private static TokenDAO? instance = null;
    private static readonly object instanceLock = new();

    private TokenDAO() { }

    public static TokenDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new TokenDAO();
                return instance;
            }
        }
    }
    public List<Token> Get()
    {
        using var _context = new ApplicationDbContext();
        return [.. _context.Tokens];
    }
    public Token? Get(int id)
    {
        using var _context = new ApplicationDbContext();
        return _context.Tokens.Where(tok => tok.Id == id).SingleOrDefault();
    }

    public Token? GetByRefreshToken(string refreshToken)
    {
        using var _context = new ApplicationDbContext();
        return _context.Tokens.Where(tok => tok.RefreshToken == refreshToken).SingleOrDefault();
    }

    public void Add(Token tokenToAdd)
    {
        using var _context = new ApplicationDbContext();
        var oldToken = Get(tokenToAdd.Id);
        if (oldToken != null)
        {
            throw new Exception("Token already exist");
        }
        _context.Tokens.Add(tokenToAdd);
        _context.SaveChanges();
    }
    public void Update(Token tokenToUpdate)
    {
        using var _context = new ApplicationDbContext();
        var oldToken = Get(tokenToUpdate.Id);
        if (oldToken == null)
        {
            throw new Exception("Token not found");
        }
        _context.Tokens.Update(tokenToUpdate);
        _context.SaveChanges();
    }
    public void Delete(int id)
    {
        using var _context = new ApplicationDbContext();
        var oldToken = Get(id);
        if (oldToken == null)
        {
            throw new Exception("Token not found");
        }
        _context.Tokens.Remove(oldToken);
        _context.SaveChanges();
    }
}
