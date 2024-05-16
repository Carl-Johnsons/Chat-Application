using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs;

public class DeleteFriendDTO
{
    [Required]
    [JsonProperty("friendId")]
    public string FriendId { get; set; } = null!;
}
