
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("ImageMessage")]
[PrimaryKey(nameof(MessageId))]
public partial class ImageMessage
{
    [Column("Message_ID")]
    public int MessageId { get; set; }
    [Column("Image_URL")]
    public string ImageUrl { get; set; } = null!;

    public virtual Message Message { get; set; } = null!;
}
