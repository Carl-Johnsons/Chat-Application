using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public record CreateIndividualConversationDTO
{
    [Required]
    [JsonProperty("otherUserId")]
    public string OtherUserId { get; set; } = null!;
}
