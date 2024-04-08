namespace AuthService.Core.DTOs;

public class TokenResponse
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public DateTime? RefreshTokenCreatedAt { get; set; } = DateTime.Now;
    public DateTime? RefreshTokenExpiredAt { get; set; }
}
