using Newtonsoft.Json;

namespace ConversationService.Domain.DTOs;

public class JoinConversationDTO
{
    [JsonProperty("memberIds")]
    public IEnumerable<Guid> MemberIds { get; set; } = [];

    [JsonProperty("conversationId")]
    public Guid ConversationId { get; set; }
}
