namespace ConversationService.Domain.Entities;
public class GroupConversation : Conversation
{
    public string Name { get; set; } = null!;
    public string? ImageURL { get; set; } = null!;
    public string? InviteURL { get; set; } = null!;
}
