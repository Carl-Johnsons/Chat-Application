using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Core.Entities;

[Table("FriendRequest")]
[PrimaryKey(nameof(SenderId), nameof(ReceiverId))]

public partial class FriendRequest
{
    [Column("Sender_Id")]
    public int SenderId { get; set; }

    [Column("Receiver_Id")]
    public int ReceiverId { get; set; }

    public string? Content { get; set; }
    [Column(TypeName = "datetime")]
    public DateTime Date { get; set; }

    [Column("Status")]
    [MaxLength(20)]
    public string? Status { get; set; }
}
