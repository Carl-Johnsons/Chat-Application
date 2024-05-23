﻿using ConversationService.Infrastructure.Persistence;

namespace ConversationService.Application.Messages.Commands;

public record SendClientMessageCommand : IRequest<Message>
{
    public Guid SenderId { get; init; }
    public Guid ConversationId { get; init; }
    public string Content { get; init; } = null!;
};

public class SendClientMessageCommandHandler : IRequestHandler<SendClientMessageCommand, Message>
{
    private readonly ApplicationDbContext _context;

    private readonly IUnitOfWork _unitOfWork;

    private readonly ISignalRService _signalRService;

    public SendClientMessageCommandHandler(IUnitOfWork unitOfWork, ApplicationDbContext context, ISignalRService signalRService)
    {

        _context = context;
        _unitOfWork = unitOfWork;
        _signalRService = signalRService;
    }


    public async Task<Message> Handle(SendClientMessageCommand request, CancellationToken cancellationToken)
    {
        var message = new Message
        {
            SenderId = request.SenderId,
            ConversationId = request.ConversationId,
            Content = request.Content,
            Source = MESSAGE_CONSTANTS.Source.CLIENT,
            Active = true,
        };

        _context.Messages.Add(message);
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        await _signalRService.InvokeAction(SignalREvent.SEND_MESSAGE_ACTION, message);

        return message;
    }

}
