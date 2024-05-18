namespace ConversationService.Application.Conversations.Queries.GetConversation;

public record GetConversationQuery(Guid ConversationId) : IRequest<Conversation?>;
