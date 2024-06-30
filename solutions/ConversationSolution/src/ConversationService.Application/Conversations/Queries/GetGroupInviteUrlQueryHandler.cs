
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;
public record GetGroupInviteUrlQuery : IRequest<Result<GroupConversationInvite?>>
{
    public Guid Id { get; set; }
}

public class GetGroupInviteUrlQueryHandler : IRequestHandler<GetGroupInviteUrlQuery, Result<GroupConversationInvite?>>
{
    private readonly IApplicationDbContext _context;

    public GetGroupInviteUrlQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<GroupConversationInvite?>> Handle(GetGroupInviteUrlQuery request, CancellationToken cancellationToken)
    {
        var inviteUrl = await _context.GroupConversationInvites
                              .Where(gci => gci.GroupConversationId == request.Id)
                              .SingleOrDefaultAsync(cancellationToken);

        return Result<GroupConversationInvite?>.Success(inviteUrl);
    }
}
