﻿namespace ConversationService.Application.Messages.Queries;

public record GetMessageQuery : IRequest<Message?>
{
    public Guid MessageId { get; init; }

};

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
