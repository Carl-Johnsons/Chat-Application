using MediatR;
using AuthService.API.Utils;
using AuthService.Core.Entities;
using AuthService.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AuthService.Core.DTOs;

namespace AuthService.API.Commands.Login;

public class LoginCommandHandler : IRequestHandler<LoginCommand, TokenResponse>
{
    private readonly ApplicationDbContext _context = new();
    public async Task<TokenResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        Account? account;
        User? user;
        account = _context.Accounts
                          .Where(acc => acc.PhoneNumber == request.LoginDTO.PhoneNumber
                                && acc.Password == request.LoginDTO.Password)
                          .SingleOrDefault();
        if (account == null)
        {
            throw new Exception("Account not found");
        }
        user = _context.Users
                       .Include(u => u.Account)
                            .ThenInclude(acc => acc.Token)
                       .Where(u => u.Id == account.UserId)
                       .SingleOrDefault();
        if (user == null)
        {
            throw new Exception("User not found");
        }
        string? accessToken = TokenUtil.GenerateAccessToken(user, TokenUtil.GetAccessTokenExpireTime());
        var refreshToken = TokenUtil.GenerateRefreshToken(TokenUtil.GetRefreshTokenExpireTime());

        user.Account.Token.RefreshToken = refreshToken.Token;
        user.Account.Token.RefreshTokenCreated = refreshToken.TokenCreatedAt;
        user.Account.Token.RefreshTokenExpired = refreshToken.TokenExpiredAt;

        _context.Users.Update(user);
        await _context.SaveChangesAsync(cancellationToken);

        return new TokenResponse()
        {
            AccessToken = accessToken,
            RefreshToken = refreshToken.Token,
            RefreshTokenCreatedAt = refreshToken.TokenCreatedAt,
            RefreshTokenExpiredAt = refreshToken.TokenExpiredAt
        };
    }

}
