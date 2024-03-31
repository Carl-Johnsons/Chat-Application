using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Core.Entities;

[Table("Account")]
[PrimaryKey(nameof(Id))]
public class Account
{
    public int Id { get; set; }
    public int UserId { get; set; }
    [Column("Phone_Number")]
    [MaxLength(10)]
    public string PhoneNumber { get; set; } = null!;
    [Column("Password")]
    [MaxLength(32)]
    public string Password { get; set; } = null!;
    [Column("Email")]
    [MaxLength(100)]
    public string? Email { get; set; }
    // Navigation prop
    public Token Token { get; set; }
}
