using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AuthService.Core.DTOs;

public class TokenModel
{
    [Required]
    [JsonProperty("accessToken")]
    public string? AccessToken { get; set; }
}
