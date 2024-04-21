using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

public class BaseEntity
{
    [Column("Id")]
    public int Id { get; set; }
}
