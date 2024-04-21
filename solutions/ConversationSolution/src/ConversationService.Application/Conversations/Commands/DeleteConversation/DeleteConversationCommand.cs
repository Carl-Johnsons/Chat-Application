namespace ConversationService.Application.Conversations.Commands.DeleteConversation;

public record DeleteConversationCommand(int ConversationId) : IRequest;
