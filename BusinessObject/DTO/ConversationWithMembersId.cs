using BussinessObject.Models;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ChatAPI.Controllers
{

    public class ConversationWithMembersId : Conversation
    {
        [Required]
        [JsonPropertyName("membersId")]
        public List<int> MembersId { get; set; } = null!;
        [JsonPropertyName("leaderId")]
        public int? LeaderId { get; set; } = null!;
    }
}
