using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class GetByConversationIdDTO
{
    public Guid? ConversationId { get; set; }

    public int? Skip { get; set; } = 0;
}
