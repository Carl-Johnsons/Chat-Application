using System.ComponentModel.DataAnnotations.Schema;

namespace Contract.Common;

public class BaseEntity
{
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public Guid Id { get; set; }
}
