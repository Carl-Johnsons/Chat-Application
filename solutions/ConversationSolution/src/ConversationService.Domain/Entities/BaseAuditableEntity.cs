using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

public class BaseAuditableEntity : BaseEntity
{
    [Column]
    public DateTime CreatedAt { get; set; }
    [Column]
    public DateTime UpdatedAt { get; set; }
}
