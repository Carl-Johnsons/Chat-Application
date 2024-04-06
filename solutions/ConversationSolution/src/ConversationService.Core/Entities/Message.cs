
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Core.Entities;

[Table("Message")]
[PrimaryKey(nameof(Id))]
public partial class Message
{
    [Column("Id")]
    public int Id { get; set; }

    [Column("Sender_Id")]
    public int? SenderId { get; set; } // This props is null if the message come from the system
    [Column("Conversation_Id")]
    public int ConversationId { get; set; } // This props is the receiver
    public string? Content { get; set; }

    [Column("Time")]
    [DataType(DataType.DateTime)]
    public DateTime Time { get; set; }

    [Column("Source")]
    [MaxLength(20)]
    public string Source { get; set; } = null!;

    [Column("Attached_Files_URL")]
    public string AttachedFilesURL { get; set; } = null!;
    [Column("Active")]
    public bool? Active { get; set; }


    // Navigation props
    public virtual Conversation Conversation { get; set; } = null!;
}
