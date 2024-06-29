using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace ConversationService.Domain.DTOs;

public class MessageResponseDTO
{
    public Guid? SenderId { get; set; }
    public Guid ConversationId { get; set; }
    public string Content { get; set; } = "";
    public string Source { get; set; } = null!;
    public bool? Active { get; set; }
    //public List<> AttachedFilesURL { get; set; } = null!;
}
