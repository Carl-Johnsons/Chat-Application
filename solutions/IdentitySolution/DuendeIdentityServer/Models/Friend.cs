using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DuendeIdentityServer.Models;

[Table("Friend")]
[PrimaryKey(nameof(UserId), nameof(FriendId))]
public class Friend
{
    [Required]
    [JsonProperty("userId")]
    public string UserId { get; set; } = null!;

    [Required]
    [JsonProperty("friendId")]
    public string FriendId { get; set; } = null!;

    [ForeignKey(nameof(UserId))]
    public ApplicationUser? User { get; set; }
}
