
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("UserBlock")]
[PrimaryKey(nameof(UserId), nameof(BlockedUserId))]

public partial class UserBlock
{
    [Column("User_ID")]
    public int UserId { get; set; }
    [Column("Blocked_User_ID")]
    public int BlockedUserId { get; set; }
    public virtual User BlockedUser { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}
