using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class CallDTO
{
    [Required]
    [JsonProperty("targetConversationId")]
    public Guid TargetConversationId { get; set; } 
}
