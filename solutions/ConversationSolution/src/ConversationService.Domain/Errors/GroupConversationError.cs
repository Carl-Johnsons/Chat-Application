namespace ConversationService.Domain.Errors;

public class GroupConversationError
{
    public static Error NotEnoughMember =>
       new("GroupConversationError.NotEnoughMember",
           "To create a group conversation, 3 or more members is require");
}
