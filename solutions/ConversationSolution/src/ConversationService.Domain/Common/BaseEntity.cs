using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Common;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
