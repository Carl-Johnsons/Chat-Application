namespace ConversationService.Application.Messages.Queries.GetLastMessage;

public record GetLastMessageQuery(Guid ConversationId) : IRequest<Message?>;
