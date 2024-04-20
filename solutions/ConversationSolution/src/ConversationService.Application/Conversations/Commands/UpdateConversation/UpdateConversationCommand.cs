namespace ConversationService.Application.Conversations.Commands.UpdateConversation;

public class UpdateConversationCommand : IRequest
{
    public Conversation Conversation { get; set; }
    public UpdateConversationCommand(Conversation conversation)
    {
        Conversation = conversation;
    }
}
