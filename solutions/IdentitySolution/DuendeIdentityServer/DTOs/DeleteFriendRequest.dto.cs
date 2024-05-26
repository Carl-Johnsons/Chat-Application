using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs;

public class DeleteFriendRequestDTO
{
    [Required]
    [JsonProperty("friendRequestId")]
    public string FriendRequestId { get; set; } = null!;
}
