using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;
public class GroupConversationWithMembersId : GroupConversation
{
    [Required]
    [JsonProperty("membersId")]
    public List<int> MembersId { get; set; } = null!;
    [JsonProperty("leaderId")]
    public int? LeaderId { get; set; } = null!;
}