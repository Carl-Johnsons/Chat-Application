using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("ConversationUser")]
[PrimaryKey(nameof(ConversationId), nameof(UserId))]

public class ConversationUser
{
    [Column("Conversation_Id")]
    public int ConversationId { get; set; }
    [Column("User_Id")]
    public int UserId { get; set; }
    public string Role { get; set; } = null!;
    public DateTime? ReadTime { get; set; } = null!;

    public virtual Conversation Conversation { get; set; } = null!;
    public virtual User User { get; set; } = null!;
}
