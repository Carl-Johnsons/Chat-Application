using BussinessObject.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("IndividualMessage")]
[PrimaryKey(nameof(MessageId))]
public partial class IndividualMessage : IMessage
{
    [Column("Message_ID")]
    public int MessageId { get; set; }

    [Column("User_Receiver_ID")]
    public int UserReceiverId { get; set; }
    [Column("Status")]
    [MaxLength(20)]
    public string? Status { get; set; }
    public bool Read { get; set; }
    public virtual Message Message { get; set; } = null!;
    public virtual User UserReceiver { get; set; } = null!;
}
