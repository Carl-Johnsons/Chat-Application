using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Core.Entities;

[Table("User")]
[PrimaryKey(nameof(Id))]
public partial class User
{
    public int Id { get; set; }
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Column("DOB")]
    [DataType(DataType.Date)]
    public DateTime DOB { get; set; }

    [MaxLength(10)]
    public string Gender { get; set; } = null!;

    [Column("Avatar_Url")]
    public string AvatarUrl { get; set; } = null!;

    [Column("Background_Url")]
    public string BackgroundUrl { get; set; } = null!;
    [MaxLength(200)]
    public string? Introduction { get; set; }

    public bool? Active { get; set; }

    // Navigation props
    public virtual Account Account { get; set; } = null!;
}


