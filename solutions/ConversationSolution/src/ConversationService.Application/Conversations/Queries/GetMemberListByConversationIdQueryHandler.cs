using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetMemberListByConversationIdQuery : IRequest<List<ConversationUser>>
{
    public Guid UserId { get; init; }
    public Guid ConversationId { get; set; }
};
public class GetMemberListByConversationIdQueryHandler : IRequestHandler<GetMemberListByConversationIdQuery, List<ConversationUser>>
{
    private readonly IApplicationDbContext _context;

    public GetMemberListByConversationIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<ConversationUser>> Handle(GetMemberListByConversationIdQuery request, CancellationToken cancellationToken)
    {
        var conversationId = request.ConversationId;
        var cuList = _context.ConversationUsers
                             .Where(cu => cu.ConversationId == conversationId
                                    && cu.UserId != request.UserId).ToListAsync();

        return cuList;
    }
}
