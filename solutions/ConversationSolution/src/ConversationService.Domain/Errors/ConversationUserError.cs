namespace ConversationService.Domain.Errors;

public class ConversationUserError
{
    public static Error NotFound =>
        new("ConversationUserError.NotFound",
            "Conversation User not found");
}
