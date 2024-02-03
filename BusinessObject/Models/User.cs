
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;

[Table("User")]
[PrimaryKey(nameof(UserId))]
public partial class User
{
    [Column("User_ID")]
    public int UserId { get; set; }

    [Column("Phone_Number")]
    [MaxLength(10)]
    public string PhoneNumber { get; set; } = null!;
    [Column("Password")]
    [MaxLength(32)]
    public string Password { get; set; } = null!;
    [MaxLength(50)]
    public string Name { get; set; } = null!;

    [Column("DOB")]
    [DataType(DataType.Date)]
    public DateTime Dob { get; set; }

    [MaxLength(10)]
    public string Gender { get; set; } = null!;

    [Column("AvatarURL")]
    public string AvatarUrl { get; set; } = null!;

    [Column("BackgroundURL")]
    public string BackgroundUrl { get; set; } = null!;
    [MaxLength(200)]
    public string? Introduction { get; set; }

    [Column("Email")]
    [MaxLength(100)]
    public string? Email { get; set; }
    public string? RefreshToken { get; set; }
    public bool? Active { get; set; }
}
