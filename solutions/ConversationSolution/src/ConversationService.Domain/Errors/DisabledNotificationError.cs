namespace ConversationService.Domain.Errors;

public class DisabledNotificationError
{
   
    public static Error AlreadyDisabledNotification => 
        new("NotificationError.AlreadyDisabledNotification",
            "You already disabled notification!");
}
