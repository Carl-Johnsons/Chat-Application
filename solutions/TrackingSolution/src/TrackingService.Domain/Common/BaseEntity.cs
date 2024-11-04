using System.ComponentModel.DataAnnotations.Schema;

namespace TrackingService.Domain.Common;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
