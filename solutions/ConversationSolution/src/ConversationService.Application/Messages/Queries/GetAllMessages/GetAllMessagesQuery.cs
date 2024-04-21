namespace ConversationService.Application.Messages.Queries.GetAllMessages;

public record GetAllMessagesQuery : IRequest<List<Message>>;
