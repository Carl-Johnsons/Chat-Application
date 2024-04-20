namespace ConversationService.Application.Conversations.Commands.CreateGroupConversation;

public class CreateGroupConversationCommand : IRequest
{
    public GroupConversationWithMembersId ConversationWithMembersId { get; set; }
    public CreateGroupConversationCommand(GroupConversationWithMembersId conversationWithMembersId)
    {
        ConversationWithMembersId = conversationWithMembersId;
    }
}
