using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetMemberListByConversationIdQuery : IRequest<Result<List<ConversationUser>?>>
{
    public Guid UserId { get; init; }
    public Guid ConversationId { get; set; }
    public bool Other { get; set; } = false;
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
        var query = _context.ConversationUsers.AsQueryable();

        if (request.Other)
        {
            query = query.Where(cu => cu.ConversationId == conversationId && cu.UserId != request.UserId);
        }
        else
        {
            query = query.Where(cu => cu.ConversationId == conversationId);
        }
        var cuList = await query.ToListAsync();


        return Result<List<ConversationUser>?>.Success(cuList);
    }
}
