namespace ConversationService.Application.Messages.Queries.GetMessage;

public class GetMessageQueryHandler : IRequestHandler<GetMessageQuery, Message?>
{
    private readonly IMessageRepository _messageRepository;

    public GetMessageQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public Task<Message?> Handle(GetMessageQuery request, CancellationToken cancellationToken)
    {
        return _messageRepository.GetByIdAsync(request.MessageId);
    }
}
