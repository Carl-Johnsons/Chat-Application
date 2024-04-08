using MediatR;
using AuthService.API.Utils;
using AuthService.Core.Entities;
using AuthService.Infrastructure;
using Microsoft.EntityFrameworkCore;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Refresh;

public sealed class RefreshCommandHandler : IRequestHandler<RefreshCommand, string?>
{
    private readonly ApplicationDbContext _context = new();
    public Task<string?> Handle(RefreshCommand request, CancellationToken cancellationToken)
    {
        Token? token = TokenUtil.ValidateRefreshToken(request.RefreshToken);
        if (token == null)
        {
            throw new Exception("token is null");
        }
        var user = _context.Users
                           .Include(u => u.Account)
                               .ThenInclude(acc => acc.Token)
                           .Where(u => u.Account.Token.Id == token.Id)
                           .SingleOrDefault();
        string? accessToken = TokenUtil.GenerateAccessToken(user, TokenUtil.GetAccessTokenExpireTime());
        return Task.FromResult(accessToken);
    }
}
