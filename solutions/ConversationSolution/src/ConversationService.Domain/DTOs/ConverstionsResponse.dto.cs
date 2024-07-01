using Newtonsoft.Json;

namespace ConversationService.Domain.DTOs;

public class ConversationsResponseDTO
{
    [JsonProperty("conversations")]
    public List<GroupConversationResponseDTO> Conversations { get; set; } = null!;
}


public class ConversationResponseDTO
{
    public Guid Id { get; set; }
    public string Type { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }

    [JsonProperty("lastMessage")]
    public Message LastMessage { get; set; } = null!;
    public virtual List<ConversationUserResponseDTO> Users { get; set; } = null!;
}
public class GroupConversationResponseDTO : ConversationResponseDTO
{
    public string Name { get; set; } = null!;
    public string? ImageURL { get; set; } = null!;
}