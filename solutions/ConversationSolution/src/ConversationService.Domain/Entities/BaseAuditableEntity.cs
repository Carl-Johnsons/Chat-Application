using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

public class BaseAuditableEntity : BaseEntity
{
    [Column("Created_At")]
    public DateTime CreatedAt { get; set; }
    [Column("Updated_At")]
    public DateTime UpdatedAt { get; set; }
}
