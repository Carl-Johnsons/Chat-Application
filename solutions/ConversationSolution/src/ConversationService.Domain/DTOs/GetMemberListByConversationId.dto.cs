
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public record GetMemberListByConversationIdDTO
{
    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; init; }

    [Required]
    [JsonProperty("other")]
    public bool Other { get; init; } = false;
}
