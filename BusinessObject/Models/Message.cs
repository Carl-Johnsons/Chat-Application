
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("Message")]
[PrimaryKey(nameof(MessageId))]

public partial class Message
{
    [Column("Message_ID")]
    public int MessageId { get; set; }

    [Column("Sender_ID")]
    public int SenderId { get; set; }

    public string? Content { get; set; }

    [Column("Time")]
    [DataType(DataType.DateTime)]
    public DateTime Time { get; set; }

    [Column("Message_Type")]
    [MaxLength(20)]
    public string MessageType { get; set; } = null!;

    [Column("Message_Format")]
    [MaxLength(20)]
    public string MessageFormat { get; set; } = null!;

    [Column("Active")]
    public bool? Active { get; set; }

    public virtual User Sender { get; set; } = null!;
}
