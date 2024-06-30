
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetGroupInvitationByInviteIdCommand : IRequest<Result<GroupConversationInvite?>>
{
    public Guid InviteId { get; init; }
}

public class GetGroupInvitationByInviteIdCommandHandler : IRequestHandler<GetGroupInvitationByInviteIdCommand, Result<GroupConversationInvite?>>
{
    private readonly IApplicationDbContext _context;

    public GetGroupInvitationByInviteIdCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<GroupConversationInvite?>> Handle(GetGroupInvitationByInviteIdCommand request, CancellationToken cancellationToken)
    {
        var invite = await _context.GroupConversationInvites
                    .Include(gci => gci.GroupConversation)
                    .Where(gci => gci.Id == request.InviteId)
                    .SingleOrDefaultAsync();

        return Result<GroupConversationInvite?>.Success(invite);
    }
}
