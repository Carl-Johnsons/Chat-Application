using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class FriendRequestDTO
{
    [Required]
    public Guid Id { get; set; }

    public Guid SenderId { get; set; }

    [Required]
    public Guid ReceiverId { get; set; }

    [Required]
    [MaxLength(100)]
    public string Content { get; set; } = null!;

    [Required]
    public string Status { get; set; } = null!;

    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
