using NotificationService.Domain.Entities;

namespace NotificationService.Domain.Interfaces;


public interface IApplicationDbContext : IDbContext 
{
    DbSet<Notification> Notifications { get; set; }

    DbSet<NotificationAction> NotificationActions { get; set; }

    DbSet<NotificationCategory> NotificationCategories { get; set; } 

    DbSet<NotificationReceiver> NotificationReceivers { get; set; }


}
