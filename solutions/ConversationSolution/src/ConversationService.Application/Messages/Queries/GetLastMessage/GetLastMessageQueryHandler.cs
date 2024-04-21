namespace ConversationService.Application.Messages.Queries.GetLastMessage;

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
