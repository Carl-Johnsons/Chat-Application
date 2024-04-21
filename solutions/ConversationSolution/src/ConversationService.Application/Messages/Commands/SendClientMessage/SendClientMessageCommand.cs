namespace ConversationService.Application.Messages.Commands.SendClientMessage;

public record SendClientMessageCommand(Message Message) : IRequest;
