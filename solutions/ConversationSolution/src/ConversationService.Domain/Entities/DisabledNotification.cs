
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("DisabledNotification")]
[PrimaryKey(nameof(Id))]
public class DisabledNotification : BaseEntity
{
    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }

    [Required]
    [JsonProperty("userId")]
    public Guid UserId { get; set;}

    public virtual Conversation Conversation { get; set; } = null!;
}
