namespace ConversationService.Domain.Errors;

public class ConversationError
{
    public static Error NotFound =>
        new("ConversationError.NotFound",
            "Conversation not found");
    public static Error AlreadyExistConversation => 
        new("ConversationError.AlreadyExistConversation", 
            "They already have the conversation, abort adding addition conversation");
}
