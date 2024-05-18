namespace ConversationService.Application.Conversations.Queries.GetConversationListByUserId;

public record GetConversationListByUserIdQuery(Guid UserId) : IRequest<List<ConversationUser>>;
