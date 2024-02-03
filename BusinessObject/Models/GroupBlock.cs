
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("GroupBlock")]
[PrimaryKey(nameof(GroupId), nameof(BlockedUserId))]

public partial class GroupBlock
{
    [Column("Group_ID")]    
    public int GroupId { get; set; }
    [Column("Blocked_User_ID")]
    public int BlockedUserId { get; set; }
    //Navigation props
    public virtual User BlockedUser { get; set; } = null!;
    public virtual Group Group { get; set; } = null!;
}
