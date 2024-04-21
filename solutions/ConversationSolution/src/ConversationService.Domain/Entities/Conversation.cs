using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("Conversation")]
[PrimaryKey(nameof(Id))]
public class Conversation : BaseEntity
{
    [Column("Type")]
    public string Type { get; set; } = null!;
    [Column("Created_At")]
    public DateTime CreatedAt { get; set; }
}
