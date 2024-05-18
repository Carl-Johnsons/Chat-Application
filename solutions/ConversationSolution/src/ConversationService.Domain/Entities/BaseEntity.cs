using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
