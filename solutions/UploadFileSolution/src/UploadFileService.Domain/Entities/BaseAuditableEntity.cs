using System.ComponentModel.DataAnnotations.Schema;

namespace UploadFileService.Domain.Entities;

public class BaseAuditableEntity : BaseEntity
{
    [Column]
    public DateTime CreatedAt { get; set; }
    [Column]
    public DateTime UpdatedAt { get; set; }
}
