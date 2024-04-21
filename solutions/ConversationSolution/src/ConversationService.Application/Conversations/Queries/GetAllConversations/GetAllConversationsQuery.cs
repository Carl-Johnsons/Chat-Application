namespace ConversationService.Application.Conversations.Queries.GetAllConversations;

public record GetAllConversationsQuery : IRequest<List<Conversation>>;
