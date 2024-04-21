namespace ConversationService.Application.Messages.Commands.SendClientMessage;

public class SendClientMessageCommandHandler : IRequestHandler<SendClientMessageCommand>
{
    private readonly IMessageRepository _messageRepository;
    private readonly IUnitOfWork _unitOfWork;

    public SendClientMessageCommandHandler(IMessageRepository messageRepository, IUnitOfWork unitOfWork)
    {
        _messageRepository = messageRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(SendClientMessageCommand request, CancellationToken cancellationToken)
    {
        var message = request.Message;
        message.Time = DateTime.Now;
        message.Source = MessageConstant.Source.CLIENT;
        message.Active = true;

        _messageRepository.Add(message);
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
