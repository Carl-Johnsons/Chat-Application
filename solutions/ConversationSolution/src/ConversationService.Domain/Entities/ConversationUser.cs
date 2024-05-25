using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("ConversationUser")]
[PrimaryKey(nameof(Id))]

public class ConversationUser : BaseEntity
{
    public Guid ConversationId { get; set; }
    public Guid UserId { get; set; }
    public string Role { get; set; } = null!;
    public DateTime? ReadTime { get; set; } = null!;

    public virtual Conversation Conversation { get; set; } = null!;
}
