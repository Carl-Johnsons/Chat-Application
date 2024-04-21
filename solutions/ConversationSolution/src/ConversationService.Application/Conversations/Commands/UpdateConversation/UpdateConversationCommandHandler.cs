namespace ConversationService.Application.Conversations.Commands.UpdateConversation;

public class UpdateConversationCommandHandler : IRequestHandler<UpdateConversationCommand>
{
    private readonly IConversationRepository _conversationRepository;
    private readonly IUnitOfWork _unitOfWork;
    public UpdateConversationCommandHandler(IConversationRepository conversationRepository, IUnitOfWork unitOfWork)
    {
        _conversationRepository = conversationRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(UpdateConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationToUpdate = request.Conversation;
        _conversationRepository.Update(conversationToUpdate);
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
