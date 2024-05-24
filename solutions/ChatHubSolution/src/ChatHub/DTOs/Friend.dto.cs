using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class FriendDTO
{
    [Required]
    [JsonProperty("userId")]
    public Guid UserId { get; set; }

    [Required]
    [JsonProperty("friendId")]
    public Guid FriendId { get; set; }
}
