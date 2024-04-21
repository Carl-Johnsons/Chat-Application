namespace ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;

public record GetMemberListByConversationIdQuery(int ConversationId) : IRequest<List<ConversationUser>>;
