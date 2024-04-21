
namespace ConversationService.Application.Messages.Queries.GetMessagesByConversationId;

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, List<Message>>
{
    private readonly IMessageRepository _messageRepository;

    public GetMessagesByConversationIdQueryHandler(IMessageRepository messageRepository)
    {
        _messageRepository = messageRepository;
    }

    public Task<List<Message>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
    {
        return _messageRepository.GetAsync(request.ConversationId, request.Skip);
    }
}
