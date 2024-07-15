using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class DisbandGroupConversationSignalRDTO
{
    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }

    [Required]
    [JsonProperty("memberIds")]
    public List<Guid>? MemberIds { get; set; }
}
