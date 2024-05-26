using System.ComponentModel.DataAnnotations.Schema;

namespace ChatHub.DTOs;

public class BaseAuditableEntity : BaseEntity
{
    [Column("Created_At")]
    public DateTime CreatedAt { get; set; }
    [Column("Updated_At")]
    public DateTime UpdatedAt { get; set; }
}
