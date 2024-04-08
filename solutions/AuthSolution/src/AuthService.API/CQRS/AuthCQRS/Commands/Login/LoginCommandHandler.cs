using MediatR;
using AuthService.API.Utils;
using AuthService.Core.Entities;
using AuthService.Infrastructure;
using Microsoft.EntityFrameworkCore;
using AuthService.Core.DTOs;
using AuthService.Infrastructure.Repositories;

namespace AuthService.API.CQRS.AuthCQRS.Commands.Login;

public sealed class LoginCommandHandler : IRequestHandler<LoginCommand, TokenResponse>
{
    private readonly ApplicationDbContext _context = new();
    private readonly UserRepository _userRepository = new();
    private readonly AccountRepository _accountRepository = new();
    public async Task<TokenResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        string phoneNumber = request.LoginDTO.PhoneNumber;
        string password = request.LoginDTO.Password;

        Account? account;
        User? user;
        account = _accountRepository.Get(phoneNumber, password);
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

        _userRepository.Update(user);
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
