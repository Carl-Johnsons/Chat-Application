using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class SendClientMessageDTO
{
    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }

    [Required]
    [JsonProperty("content")]
    public string Content { get; set; } = null!;
}
