using System.ComponentModel.DataAnnotations.Schema;

namespace ConversationService.Domain.Entities;
public class GroupConversation : Conversation
{
    [Column("Name")]
    public string Name { get; set; } = null!;
    [Column("Image_URL")]
    public string? ImageURL { get; set; } = null!;
    [Column("Invite_URL")]
    public string? InviteURL { get; set; } = null!;
}
