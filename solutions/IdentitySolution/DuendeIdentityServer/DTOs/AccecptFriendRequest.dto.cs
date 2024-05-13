using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs;

public class AccecptFriendRequestDTO
{
    [Required]
    [JsonProperty("friendRequestId")]
    public string FriendRequestId { get; set; } = null!;
}
