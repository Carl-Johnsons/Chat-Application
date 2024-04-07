using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AuthService.Core.DTOs;

public class RefreshTokenModel
{
    [Required]
    [JsonProperty("refreshToken")]
    public string? Token { get; set; }
    public DateTime? TokenCreatedAt { get; set; } = DateTime.Now;
    public DateTime? TokenExpiredAt { get; set; }
}
