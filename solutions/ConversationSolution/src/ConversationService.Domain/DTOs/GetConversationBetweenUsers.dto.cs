using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class GetConversationBetweenUsersDTO
{
    [Required]
    [JsonProperty("otherUserId")]
    public Guid OtherUserId { get; set; }
}
