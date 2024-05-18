using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("Conversation")]
[PrimaryKey(nameof(Id))]
public class Conversation : BaseAuditableEntity
{
    [Required]
    [JsonProperty("type")]
    public string Type { get; set; } = null!;
}
