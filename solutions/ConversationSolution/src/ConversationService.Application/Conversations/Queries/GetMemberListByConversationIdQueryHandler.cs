using ConversationService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetMemberListByConversationIdQuery(Guid UserId, Guid ConversationId) : IRequest<List<ConversationUser>>;
public class GetMemberListByConversationIdQueryHandler : IRequestHandler<GetMemberListByConversationIdQuery, List<ConversationUser>>
{
    private readonly ApplicationDbContext _context;

    public GetMemberListByConversationIdQueryHandler(ApplicationDbContext context)
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
