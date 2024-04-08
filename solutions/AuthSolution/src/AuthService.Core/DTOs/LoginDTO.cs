
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace AuthService.Core.DTOs;

public class LoginDTO
{
    [Required]
    [JsonProperty("phoneNumber")]
    public string? PhoneNumber { get; set; }

    [Required]
    [JsonProperty("password")]
    public string? Password { get; set; }

}
