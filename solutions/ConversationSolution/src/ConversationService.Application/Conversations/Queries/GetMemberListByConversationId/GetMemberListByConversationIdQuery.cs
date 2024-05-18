namespace ConversationService.Application.Conversations.Queries.GetMemberListByConversationId;

public record GetMemberListByConversationIdQuery(Guid ConversationId) : IRequest<List<ConversationUser>>;
