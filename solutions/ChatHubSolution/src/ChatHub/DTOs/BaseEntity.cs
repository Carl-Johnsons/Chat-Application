using System.ComponentModel.DataAnnotations.Schema;

namespace ChatHub.DTOs;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
