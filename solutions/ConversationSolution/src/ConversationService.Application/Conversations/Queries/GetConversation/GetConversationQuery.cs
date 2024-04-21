namespace ConversationService.Application.Conversations.Queries.GetConversation;

public record GetConversationQuery(int ConversationId) : IRequest<Conversation?>;
