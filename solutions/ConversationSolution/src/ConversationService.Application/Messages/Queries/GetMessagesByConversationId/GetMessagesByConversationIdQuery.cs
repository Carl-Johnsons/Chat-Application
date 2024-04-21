namespace ConversationService.Application.Messages.Queries.GetMessagesByConversationId;

public record GetMessagesByConversationIdQuery(int ConversationId, int Skip) : IRequest<List<Message>>;
