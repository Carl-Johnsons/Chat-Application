using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.Models
{
    public class SenderConversationModel
    {
        [Required]
        [JsonProperty("senderId")]
        public int SenderId { get; set; }

        [Required]
        [JsonProperty("conversationId")]
        public int ConversationId { get; set; }
    }

}
