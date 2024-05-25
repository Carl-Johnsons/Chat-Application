using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class ConversationWithMembersId : Conversation
{
    [Required]
    [JsonProperty("membersId")]
    public List<Guid> MembersId { get; set; } = null!;
}
