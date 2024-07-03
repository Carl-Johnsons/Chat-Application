using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;
public class JoinGroupConversationDTO
{
    [Required]
    [JsonProperty("groupId")]
    public Guid GroupId { get; set; }
    [Required]
    [JsonProperty("inviteId")]
    public Guid InviteId { get; set; }
}
