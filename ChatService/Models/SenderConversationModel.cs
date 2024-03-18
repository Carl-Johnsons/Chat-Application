using Newtonsoft.Json;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ChatService.Models
{
    public class SenderConversationModel
    {
        [Required]
        [JsonPropertyName("senderId")]
        public int SenderId { get; set; }

        [Required]
        [JsonPropertyName("conversationId")]
        public int ConversationId { get; set; }
    }

}
