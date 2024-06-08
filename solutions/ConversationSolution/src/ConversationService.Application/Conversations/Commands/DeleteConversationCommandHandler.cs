
namespace ConversationService.Application.Conversations.Commands;
public record DeleteConversationCommand : IRequest<Result>
{
    public Guid ConversationId { get; init; }
};

public class DeleteConversationCommandHandler : IRequestHandler<DeleteConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(DeleteConversationCommand request, CancellationToken cancellationToken)
    {
        var conversation = _context.Conversations
                                   .Where(c => c.Id == request.ConversationId)
                                   .SingleOrDefault();
        if (conversation == null)
        {
            return ConversationError.NotFound;
        }
        
        _context.Conversations.Remove(conversation);
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}
