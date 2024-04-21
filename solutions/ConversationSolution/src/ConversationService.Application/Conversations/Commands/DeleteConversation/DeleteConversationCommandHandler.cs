namespace ConversationService.Application.Conversations.Commands.DeleteConversation;

public class DeleteConversationCommandHandler : IRequestHandler<DeleteConversationCommand>
{
    private readonly IConversationRepository _conversationRepository;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteConversationCommandHandler(IConversationRepository conversationRepository, IUnitOfWork unitOfWork)
    {
        _conversationRepository = conversationRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteConversationCommand request, CancellationToken cancellationToken)
    {
        var conversation = await _conversationRepository.GetByIdAsync(request.ConversationId);
        if (conversation != null)
        {
            _conversationRepository.Remove(conversation);
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
