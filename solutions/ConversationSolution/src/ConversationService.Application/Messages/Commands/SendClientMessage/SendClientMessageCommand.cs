using ConversationService.Domain.Entities;
using MediatR;

namespace ConversationService.Application.Messages.Commands.SendClientMessage;

public class SendClientMessageCommand : IRequest
{
    public Message Message { get; set; }
    public SendClientMessageCommand(Message message)
    {
        Message = message;
    }
}
