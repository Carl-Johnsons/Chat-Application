
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;

public record DisbandGroupConversationCommand : IRequest<Result>
{
    public Guid GroupLeaderId { get; init; }
    public Guid ConversationId { get; init; }
}

public class DisbandGroupConversationCommandHandler : IRequestHandler<DisbandGroupConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISignalRService _signalRService;

    public DisbandGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, ISignalRService signalRService)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _signalRService = signalRService;
    }

    public async Task<Result> Handle(DisbandGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var leaderId = request.GroupLeaderId;
        var conversationId = request.ConversationId;

        var grConversation = await _context.GroupConversation
                                           .Where(gc => gc.Id == conversationId)
                                           .SingleOrDefaultAsync();
        if (grConversation == null)
        {
            return Result.Failure(GroupConversationError.NotFound);
        }

        var conversationUser = await _context.ConversationUsers
                                             .Where(cu => cu.UserId == leaderId
                                                       && cu.ConversationId == conversationId)
                                             .SingleOrDefaultAsync();
        if (conversationUser == null)
        {
            return Result.Failure(GroupConversationError.NotFound);
        }
        if (conversationUser.Role == CONVERSATION_USER_TYPE.MEMBER)
        {
            return Result.Failure(GroupConversationError.NotAuthorized);
        }

        var memberIds = await _context.ConversationUsers
                                .Where(cu => cu.ConversationId == conversationId)
                                .Select(cu => cu.UserId)
                                .ToListAsync();

        _context.GroupConversation.Remove(grConversation);
        await _unitOfWork.SaveChangeAsync(cancellationToken);
        await _signalRService.InvokeAction(SignalREvent.DISBAND_CONVERSATION_ACTION, new DisbandGroupConversationSignalRDTO
        {
            ConversationId = conversationId,
            MemberIds = memberIds
        });
        return Result.Success();
    }
}
