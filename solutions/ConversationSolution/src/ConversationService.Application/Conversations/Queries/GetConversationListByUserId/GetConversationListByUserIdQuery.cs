namespace ConversationService.Application.Conversations.Queries.GetConversationListByUserId;

public record GetConversationListByUserIdQuery(int UserId) : IRequest<List<ConversationUser>>;
