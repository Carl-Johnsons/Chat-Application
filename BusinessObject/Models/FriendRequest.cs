using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace BussinessObject.Models;

[Table("FriendRequest")]
[PrimaryKey(nameof(SenderId), nameof(ReceiverId))]

public partial class FriendRequest
{
    [Column("Sender_ID")]
    public int SenderId { get; set; }

    [Column("Receiver_ID")]
    public int ReceiverId { get; set; }

    public string? Content { get; set; }
    [Column(TypeName = "datetime")]
    public DateTime Date { get; set; }

    [Column("Status")]
    [MaxLength(20)]
    public string? Status { get; set; }

    //Navigation prop
    public virtual User Receiver { get; set; } = null!;
    public virtual User Sender { get; set; } = null!;
}
