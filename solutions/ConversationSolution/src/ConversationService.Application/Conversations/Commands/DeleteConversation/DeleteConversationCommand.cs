namespace ConversationService.Application.Conversations.Commands.DeleteConversation;

public record DeleteConversationCommand(Guid ConversationId) : IRequest;
