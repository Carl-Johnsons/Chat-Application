using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DuendeIdentityServer.Models;

[Table("FriendRequest")]
[PrimaryKey(nameof(Id))]
public class FriendRequest
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }

    [Required]
    public string SenderId { get; set; } = null!;

    [Required]
    public string ReceiverId { get; set; } = null!;

    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = null!;

    [Required]
    public string Status { get; set; } = null!;

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ApplicationUser? Sender { get; set; }

    public ApplicationUser? Receiver { get; set; }
}
