namespace ConversationService.Application.Messages.Queries.GetLastMessage;

public record GetLastMessageQuery(int ConversationId) : IRequest<Message?>;
