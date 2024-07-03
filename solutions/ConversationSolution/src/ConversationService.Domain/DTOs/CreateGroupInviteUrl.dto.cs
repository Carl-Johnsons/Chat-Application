using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class CreateGroupInviteUrlDTO
{
    [Required]
    [JsonProperty("groupId")]
    public Guid GroupId { get; set; }
}
