using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetMemberListByConversationIdQuery : IRequest<Result<List<ConversationUser>?>>
{
    public Guid UserId { get; init; }
    public Guid ConversationId { get; set; }
};
public class GetMemberListByConversationIdQueryHandler : IRequestHandler<GetMemberListByConversationIdQuery, Result<List<ConversationUser>?>>
{
    private readonly IApplicationDbContext _context;

    public GetMemberListByConversationIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<ConversationUser>?>> Handle(GetMemberListByConversationIdQuery request, CancellationToken cancellationToken)
    {
        var conversationId = request.ConversationId;
        var cuList = await _context.ConversationUsers
                             .Where(cu => cu.ConversationId == conversationId).ToListAsync();

        return Result<List<ConversationUser>?>.Success(cuList);
    }
}
