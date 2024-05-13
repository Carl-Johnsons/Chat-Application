using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs;

public class SendFriendRequestDTO
{
    [JsonProperty("receiverId")]
    [Required]
    public string ReceiverId { get; set; } = null!;

    [JsonProperty("content")]
    [Required]
    public string Content { get; set; } = string.Empty;
}
