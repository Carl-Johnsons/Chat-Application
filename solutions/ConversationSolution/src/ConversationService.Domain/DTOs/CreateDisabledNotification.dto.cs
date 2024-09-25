using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class CreateDisabledNotificationDTO
{
    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }
}
