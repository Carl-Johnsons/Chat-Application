
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;
public record GetConversationBetweenUsersQuery : IRequest<Result<Conversation?>>
{
    public Guid UserId { get; set; }
    public Guid OtherUserId { get; set; }
}
public class GetConversationBetweenUsersQueryHandler : IRequestHandler<GetConversationBetweenUsersQuery, Result<Conversation?>>
{
    private readonly IApplicationDbContext _context;

    public GetConversationBetweenUsersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Conversation?>> Handle(GetConversationBetweenUsersQuery request, CancellationToken cancellationToken)
    {
        var query = from cu1 in _context.ConversationUsers
                    join cu2 in _context.ConversationUsers
                    on cu1.ConversationId equals cu2.ConversationId
                    join c in _context.Conversations
                    on cu1.ConversationId equals c.Id
                    where cu1.UserId == request.UserId
                          && cu2.UserId == request.OtherUserId
                          && c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL
                    select cu1.ConversationId;

        var conversationId = await query.SingleOrDefaultAsync(cancellationToken);
        if (conversationId == Guid.Empty)
        {
            return Result<Conversation?>.Success(null);
        }

        var conversation = await _context.Conversations
                            .Where(c => c.Id == conversationId)
                            .SingleOrDefaultAsync(cancellationToken);

        return Result<Conversation?>.Success(conversation);
    }
}
