using System.ComponentModel.DataAnnotations;

namespace AuthService.Core.DTOs;

public class UserClaim
{
    [Required]
    public int UserId;
    [Required]
    public string? Name;
}
