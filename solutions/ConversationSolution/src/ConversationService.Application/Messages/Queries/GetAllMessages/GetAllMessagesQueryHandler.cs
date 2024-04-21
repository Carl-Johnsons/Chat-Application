namespace ConversationService.Application.Messages.Queries.GetAllMessages;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, List<Message>>
{
    private readonly IMessageRepository _messageRepository;

    public GetAllMessagesQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public Task<List<Message>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
    {
        return _messageRepository.GetAsync();
    }
}
