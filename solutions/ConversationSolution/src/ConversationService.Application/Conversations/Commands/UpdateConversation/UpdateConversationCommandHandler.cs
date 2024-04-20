namespace ConversationService.Application.Conversations.Commands.UpdateConversation;

public class UpdateConversationCommandHandler : IRequestHandler<UpdateConversationCommand>
{
    private readonly ConversationRepository _conversationRepository = new();
    public Task Handle(UpdateConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationToUpdate = request.Conversation;
        _conversationRepository.Update(conversationToUpdate);
        return Task.CompletedTask;
    }
}
