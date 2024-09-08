
namespace NotificationService.Domain.Entities;

public class NotificationCategory : BaseEntity
{
    public string Code { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
}
