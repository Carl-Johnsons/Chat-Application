namespace ConversationService.Domain.DTOs;

public class ConversationUserResponseDTO
{
    public Guid UserId { get; set; }
    public string Role { get; set; } = null!;
    public DateTime? ReadTime { get; set; } = null!;
}
