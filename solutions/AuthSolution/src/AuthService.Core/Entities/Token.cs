using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AuthService.Core.Entities;

[Table("Token")]
[PrimaryKey(nameof(Id))]
public class Token
{
    public int Id { get; set; }
    public int AccountId { get; set; }

    [MaxLength(100)]
    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenCreated { get; set; }
    public DateTime? RefreshTokenExpired { get; set; }
}
