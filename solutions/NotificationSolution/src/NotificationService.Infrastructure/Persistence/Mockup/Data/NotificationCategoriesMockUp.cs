using NotificationService.Domain.Constants;

namespace NotificationService.Infrastructure.Persistence.Mockup.Data;

public class NotificationCategories : Domain.Common.BaseEntity
{
    public string Code { get; set; } = null!;
    public string ImageUrl { get; set; } = null!;
}

public static class NotificationCategoriesMockUp
{
    public static NotificationCategories[] Data { get; set; } = [
            new NotificationCategories {
                Code= NOTIFICATION_CATEGORY.SYSTEM,
                ImageUrl=""
            },
            new NotificationCategories {
                Code= NOTIFICATION_CATEGORY.POST,
                ImageUrl=""
            },
            new NotificationCategories {
                Code= NOTIFICATION_CATEGORY.GROUP,
                ImageUrl=""
            },
            new NotificationCategories{
                Code= NOTIFICATION_CATEGORY.USER,
                ImageUrl=""
            }
        ];
}
