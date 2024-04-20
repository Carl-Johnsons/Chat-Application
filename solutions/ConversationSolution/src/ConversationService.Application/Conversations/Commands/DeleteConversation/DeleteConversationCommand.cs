namespace ConversationService.Application.Conversations.Commands.DeleteConversation;

public class DeleteConversationCommand : IRequest
{
    public int ConversationId { get; set; }
    public DeleteConversationCommand(int conversationId)
    {
        ConversationId = conversationId;
    }
}
