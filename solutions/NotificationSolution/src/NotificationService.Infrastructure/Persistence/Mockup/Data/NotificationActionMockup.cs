using NotificationService.Domain.Constants;

namespace NotificationService.Infrastructure.Persistence.Mockup.Data;

public class NotificationAction : Domain.Common.BaseEntity
{
    public string Code { get; set; } = null!;
}

public static class NotificationActionMockup
{
    public static NotificationAction[] Data { get; set; } = [
            // Conversation
            new NotificationAction {
                Code= NOTIFICATION_ACTION.ADD_MEMBER_TO_GROUP,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.JOIN_CONVERSATION,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.LEAVE_CONVERSATION,
            },
            // Post
            new NotificationAction {
                Code= NOTIFICATION_ACTION.POST_INTERACTION,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.POST_COMMENT,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.POST_REPLY,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.POST_WARNING,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.POST_USER_TAG,
            },
            // User
            new NotificationAction {
                Code= NOTIFICATION_ACTION.SEND_FRIEND_REQUEST,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.ACCEPT_FRIEND_REQUEST,
            },
            new NotificationAction {
                Code= NOTIFICATION_ACTION.UPDATE_PROFILE,
            }
        ];
}
