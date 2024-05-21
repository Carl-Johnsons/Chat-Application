namespace ConversationService.Application.Messages.Queries;

public record GetLastMessageQuery(Guid ConversationId) : IRequest<Message?>;

public class GetLastMessageQueryHandler : IRequestHandler<GetLastMessageQuery, Message?>
{
    private readonly IMessageRepository _messageRepository;

    public GetLastMessageQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public Task<Message?> Handle(GetLastMessageQuery request, CancellationToken cancellationToken)
    {
        return _messageRepository.GetLastAsync(request.ConversationId);
    }
}
