
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.MessageCQRS.Commands.SendClientMessage;

public class SendClientMessageCommand : IRequest
{
    public Message Message { get; set; }
    public SendClientMessageCommand(Message message)
    {
        Message = message;
    }
}
