using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;
public class CreateGroupConversationDTO : GroupConversation
{
    [Required]
    [JsonProperty("membersId")]
    public List<Guid> MembersId { get; set; } = null!;
    [JsonProperty("leaderId")]
    public Guid? LeaderId { get; set; } = null!;
}