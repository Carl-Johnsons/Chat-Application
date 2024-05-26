using Newtonsoft.Json;

namespace ConversationService.Domain.DTOs;

public class ConversationsResponseDTO
{
    [JsonProperty("conversations")]
    public List<ConversationResponseDTO> Conversations { get; set; } = null!;

    [JsonProperty("groupConversations")]
    public List<GroupConversationResponseDTO> GroupConversations { get; set; } = null!;
}


public class ConversationResponseDTO
{
    public Guid Id { get; set; }
    public string Type { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public virtual List<ConversationUserResponseDTO> Users { get; set; } = null!;
}
public class GroupConversationResponseDTO : ConversationResponseDTO
{
    public string Name { get; set; } = null!;
    public string? ImageURL { get; set; } = null!;
    public string? InviteURL { get; set; } = null!;
}