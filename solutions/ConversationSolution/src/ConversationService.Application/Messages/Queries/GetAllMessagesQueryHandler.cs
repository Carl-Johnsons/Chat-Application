namespace ConversationService.Application.Messages.Queries;
public record GetAllMessagesQuery : IRequest<List<Message>>;

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
