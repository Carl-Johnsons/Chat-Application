using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class UserClaim
{
    [Required]
    [JsonProperty("userId")]
    public int UserId;

    [Required]
    [JsonProperty("phoneNumber")]
    public string? PhoneNumber;

    [JsonProperty("email")]
    public string? Email;
}
