using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;

public record LeaveGroupConversationCommand : IRequest<Result>
{
    public Guid UserId { get; init; }
    public Guid ConversationId { get; init; }
}


public class LeaveGroupConversationCommandHandler : IRequestHandler<LeaveGroupConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public LeaveGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(LeaveGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var userId = request.UserId;
        var conversationId = request.ConversationId;

        var conversationUser = await _context.ConversationUsers
                                              .Where(cu => cu.UserId == userId && cu.ConversationId == conversationId)
                                              .SingleOrDefaultAsync();
        if (conversationUser == null)
        {
            return Result.Failure(ConversationUserError.NotFound);
        }
        _context.ConversationUsers.Remove(conversationUser);
        
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}
