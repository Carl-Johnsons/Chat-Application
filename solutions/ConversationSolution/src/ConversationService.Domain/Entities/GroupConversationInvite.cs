using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;

[Table("GroupConversationInvite")]
[PrimaryKey(nameof(Id))]
public class GroupConversationInvite : BaseAuditableEntity
{
    [Required]
    [JsonProperty("groupConversationId")]
    public Guid GroupConversationId { get; set; }

    [Required]
    [JsonProperty("expiresAt")]
    public DateTime ExpiresAt { get; set; }


    public virtual GroupConversation GroupConversation { get; set; } = null!;
    public bool IsExpired => DateTime.UtcNow > ExpiresAt;
}
