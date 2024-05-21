using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DuendeIdentityServer.Models;
[Table("UserBlock")]
[PrimaryKey(nameof(UserId), nameof(BlockUserId))]
public class UserBlock
{
    [Required]
    public string UserId { get; set; } = null!;
    [Required]
    public string BlockUserId { get; set; } = null!;

    public ApplicationUser? User { get; set; }

    public ApplicationUser? BlockUser { get; set; }
}
