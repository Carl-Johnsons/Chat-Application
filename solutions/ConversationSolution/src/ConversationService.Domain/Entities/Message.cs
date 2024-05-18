using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("Message")]
[PrimaryKey(nameof(Id))]
public partial class Message : BaseAuditableEntity
{
    public Guid? SenderId { get; set; } // This props is null if the message come from the system
    [Required]
    public Guid ConversationId { get; set; } // This props is the receiver
    public string? Content { get; set; }

    [MaxLength(20)]
    public string Source { get; set; } = null!;

    public string AttachedFilesURL { get; set; } = null!;
    public bool? Active { get; set; }


    // Navigation props
    public virtual Conversation Conversation { get; set; } = null!;
}
