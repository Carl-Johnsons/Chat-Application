using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class SendCallSignalDTO
{
    [Required]
    [JsonProperty("targetConversationId")]
    public Guid TargetConversationId { get; set; }
    [Required]
    [JsonProperty("signalData")]
    public string SignalData { get; set; } = null!;
}
