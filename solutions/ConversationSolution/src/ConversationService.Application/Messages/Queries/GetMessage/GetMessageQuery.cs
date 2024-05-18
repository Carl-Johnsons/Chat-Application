namespace ConversationService.Application.Messages.Queries.GetMessage;

public record GetMessageQuery(Guid MessageId) : IRequest<Message?>;
