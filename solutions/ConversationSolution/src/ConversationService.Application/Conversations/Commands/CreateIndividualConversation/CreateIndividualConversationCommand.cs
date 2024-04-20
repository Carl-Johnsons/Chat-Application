namespace ConversationService.Application.Conversations.Commands.CreateIndividualConversation;

public class CreateIndividualConversationCommand : IRequest
{
    public ConversationWithMembersId ConversationWithMembersId { get; set; }
    public CreateIndividualConversationCommand(ConversationWithMembersId conversationWithMembersId)
    {
        ConversationWithMembersId = conversationWithMembersId;
    }
}
