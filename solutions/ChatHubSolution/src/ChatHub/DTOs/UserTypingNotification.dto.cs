using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class UserTypingNotificationDTO
{
    // This empty constructor support serialization
    public UserTypingNotificationDTO()
    {
    }

    [Required]
    [JsonProperty("senderId")]
    public Guid SenderId { get; set; }

    [Required]
    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }
}
