using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace BussinessObject.Models;
[Table("Conversation")]
[PrimaryKey(nameof(Id))]
public class Conversation
{
    [Column("Id")]
    public int Id { get; set; }
    [Column("Type")]
    public string Type { get; set; } = null!;
    [Column("Created_At")]
    public DateTime CreatedAt { get; set; }
}
