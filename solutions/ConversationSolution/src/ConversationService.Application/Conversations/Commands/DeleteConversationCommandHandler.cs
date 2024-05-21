using ConversationService.Infrastructure.Persistence;

namespace ConversationService.Application.Conversations.Commands;
public record DeleteConversationCommand(Guid ConversationId) : IRequest;

public class DeleteConversationCommandHandler : IRequestHandler<DeleteConversationCommand>
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteConversationCommandHandler(IUnitOfWork unitOfWork, ApplicationDbContext context)
    {
        _unitOfWork = unitOfWork;
        _context = context;
    }

    public async Task Handle(DeleteConversationCommand request, CancellationToken cancellationToken)
    {
        var conversation = _context.Conversations
                                   .Where(c => c.Id == request.ConversationId)
                                   .SingleOrDefault();
        if (conversation != null)
        {
            _context.Conversations.Remove(conversation);
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
