using AuthService.API.Controllers;
using AuthService.Core.DTOs;
using AuthService.Core.Entities;
using AuthService.Infrastructure;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace AuthService.API.Utils;

public static class TokenUtil
{
    public static readonly string RefreshTokenCookieName = "refresh-token";
    
    private static readonly string privateKeyFile = "key.pem";
    private static readonly string Issuer = Environment.GetEnvironmentVariable("Jwt__Issuer") ?? "";
    private static readonly string Audience = Environment.GetEnvironmentVariable("Jwt__Audience") ?? "";
    private static readonly int AccessTokenExpireMinutes = 15;
    private static readonly int RefreshTokenExpireDays = 7;

    public static string? GenerateAccessToken(User? user, DateTime exp)
    {
        if (Issuer == "" || Audience == "" || user == null)
        {
            return null;
        }
        string privateKeyContent = File.ReadAllText(privateKeyFile);
        using (RSA rsa = RSA.Create())
        {
            rsa.ImportFromPem(privateKeyContent.ToCharArray());

            var securityKey = new RsaSecurityKey(rsa);
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.RsaSha256)
            {
                // Reference: https://stackoverflow.com/questions/62307933/rsa-disposed-object-error-every-other-test
                // This will solve rsa dispose error every test case
                CryptoProviderFactory = new CryptoProviderFactory { CacheSignatureProviders = false }
            };

            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim(ClaimTypes.GivenName,user.Name),
        };

            var token = new JwtSecurityToken(
                Issuer,
                Audience,
                claims,
                expires: exp,
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
    public static RefreshTokenModel GenerateRefreshToken(DateTime exp)
    {
        var refreshToken = new RefreshTokenModel
        {
            Token = Convert.ToBase64String(RandomNumberGenerator.GetBytes(32)),
            TokenCreatedAt = DateTime.Now,
            TokenExpiredAt = exp
        };
        return refreshToken;
    }
    public static Token? ValidateRefreshToken(string? refreshToken)
    {
        if (refreshToken == null)
        {
            return null;
        }
        using var _context = new ApplicationDbContext();
        var token = _context.Tokens
                            .Where(tok => tok.RefreshToken == refreshToken)
                            .SingleOrDefault();
        if (token == null ||
            token.RefreshTokenExpired != null
            && token.RefreshTokenExpired < DateTime.Now)
        {
            return null;
        }
        return token;
    }
    public static DateTime GetAccessTokenExpireTime()
    {
        return DateTime.Now.AddMinutes(AccessTokenExpireMinutes);
    }
    public static DateTime GetRefreshTokenExpireTime()
    {
        return DateTime.Now.AddDays(RefreshTokenExpireDays);
    }
}
