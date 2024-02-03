using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;

[Table("Friend")]
[PrimaryKey(nameof(UserId), nameof(FriendId))]
public partial class Friend
{
    [Column("User_ID")]
    public int UserId { get; set; }

    [Column("Friend_ID")]
    public int FriendId { get; set; }
    //Navigation props
    public virtual User FriendNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
