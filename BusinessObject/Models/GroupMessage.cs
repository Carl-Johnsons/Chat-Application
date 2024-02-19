using BussinessObject.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;
namespace BussinessObject.Models;

[Table("GroupMessage")]
[PrimaryKey(nameof(MessageId), nameof(GroupReceiverId))]

public partial class GroupMessage : IMessage
{
    [Column("Message_ID")]
    public int MessageId { get; set; }
    [Column("Group_Receiver_ID")]
    public int GroupReceiverId { get; set; }
    public virtual Group GroupReceiver { get; set; } = null!;
    public virtual Message Message { get; set; } = null!;
}
