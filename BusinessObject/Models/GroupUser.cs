using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;

[Table("GroupUser")]
[PrimaryKey(nameof(GroupId), nameof(UserId))]
public partial class GroupUser
{
    [Column("Group_ID")]
    public int GroupId { get; set; }
    [Column("User_ID")]
    public int UserId { get; set; }

    //Navigate prop
    public virtual Group? Group { get; set; }
    public virtual User? User { get; set; }
}
