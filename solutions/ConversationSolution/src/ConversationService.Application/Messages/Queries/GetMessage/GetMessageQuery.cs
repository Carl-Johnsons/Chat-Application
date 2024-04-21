namespace ConversationService.Application.Messages.Queries.GetMessage;

public record GetMessageQuery(int MessageId) : IRequest<Message?>;
