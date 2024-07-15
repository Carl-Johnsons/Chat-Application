namespace ConversationService.Domain.Errors;

public class GroupConversationError
{
    public static Error NotEnoughMember =>
       new("GroupConversationError.NotEnoughMember",
           "To create a group conversation, 3 or more members is require");
    public static Error NotFound =>
       new("GroupConversationError.NotFound",
           "Group conversation not found");
    public static Error InviteNotFound =>
       new("GroupConversationError.InviteNotFound",
           "Group invitation not found");
    public static Error InviteExpired =>
       new("GroupConversationError.InviteExpired",
           "Group invitation has been expired");
    public static Error AlreadyJoinGroupConversation =>
       new("GroupConversationError.AlreadyJoinGroupConversation",
           "You have already joined the group");
    public static Error NotAuthorized =>
       new("GroupConversationError.NotAuthorized",
           "You don't have the authority to perform this action");
}
