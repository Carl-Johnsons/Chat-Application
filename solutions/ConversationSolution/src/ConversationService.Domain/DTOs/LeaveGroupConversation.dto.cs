using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class LeaveGroupConversationDTO
{
    [Required]
    [JsonProperty("groupConversationId")]
    public Guid GroupConversationId { get; set; }
}
