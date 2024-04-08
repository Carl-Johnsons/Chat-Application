using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Core.Entities;

[Table("Friend")]
[PrimaryKey(nameof(UserId), nameof(FriendId))]
public partial class Friend
{
    [Column("User_Id")]
    public int UserId { get; set; }

    [Column("Friend_Id")]
    public int FriendId { get; set; }
}
