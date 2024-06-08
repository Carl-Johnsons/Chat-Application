using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetAllConversationsQuery : IRequest<Result<List<Conversation>>>;

public class GetAllConversationsQueryHandler : IRequestHandler<GetAllConversationsQuery, Result<List<Conversation>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllConversationsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<Conversation>>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
    {
        var conversations = await _context.Conversations
            .Include(c => c.Users) 
            .ToListAsync(cancellationToken);

        return Result<List<Conversation>>.Success(conversations);
    }
}
