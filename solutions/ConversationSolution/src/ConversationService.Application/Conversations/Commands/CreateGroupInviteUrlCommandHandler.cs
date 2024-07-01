
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;

public record CreateGroupInviteUrlCommand : IRequest<Result<GroupConversationInvite?>>
{
    public Guid GroupId { get; init; }
}

public class CreateGroupInviteUrlCommandHandler : IRequestHandler<CreateGroupInviteUrlCommand, Result<GroupConversationInvite?>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;


    public CreateGroupInviteUrlCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<GroupConversationInvite?>> Handle(CreateGroupInviteUrlCommand request, CancellationToken cancellationToken)
    {
        var groupId = await _context.GroupConversation
                            .Where(gc => gc.Id == request.GroupId)
                            .SingleOrDefaultAsync(cancellationToken);

        if (groupId == null)
        {
            return Result<GroupConversationInvite?>.Failure(GroupConversationError.NotFound);
        }

        var inviteUrl = await _context.GroupConversationInvites
                        .Where(gci => gci.GroupConversationId == request.GroupId)
                        .SingleOrDefaultAsync(cancellationToken);

        if (inviteUrl != null)
        {
            _context.GroupConversationInvites.Remove(inviteUrl);
        }
        var expiresAt = DateTime.UtcNow.AddDays(CONVERSATION_CONSTANT.GROUP_INVITE_EXPIRE_DURATION);
        var newInviteUrl = new GroupConversationInvite
        {
            GroupConversationId = request.GroupId,
            ExpiresAt = expiresAt,
        };
        
        _context.GroupConversationInvites.Add(newInviteUrl);

        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result<GroupConversationInvite?>.Success(newInviteUrl);
    }
}
