namespace ConversationService.Application.Messages.Queries.GetMessagesByConversationId;

public record GetMessagesByConversationIdQuery(Guid ConversationId, int Skip) : IRequest<List<Message>>;
