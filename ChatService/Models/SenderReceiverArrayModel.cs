using Newtonsoft.Json;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations;

namespace ChatService.Models
{
    public class SenderReceiverArrayModel
    {
        [Required]
        [JsonPropertyName("senderId")]
        public int SenderId { get; set; }

        [Required]
        [JsonPropertyName("receiverId")]
        public int ReceiverId { get; set; }

        [Required]
        [JsonPropertyName("type")]
        public string Type { get; set; }
    }

}
