namespace ConversationService.Application.Conversations.Commands.UpdateConversation;

public record UpdateConversationCommand(Conversation Conversation) : IRequest;
