using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Constants;
using MediatR;

namespace ConversationService.Application.Messages.Commands.SendClientMessage;

public class SendClientMessageCommandHandler : IRequestHandler<SendClientMessageCommand>
{
    private readonly MessageRepository _messageRepository = new();

    public Task Handle(SendClientMessageCommand request, CancellationToken cancellationToken)
    {
        var message = request.Message;
        message.Time = DateTime.Now;
        message.Source = MessageConstant.Source.CLIENT;
        message.Active = true;

        _messageRepository.AddMessage(message);
        return Task.CompletedTask;
    }
}
