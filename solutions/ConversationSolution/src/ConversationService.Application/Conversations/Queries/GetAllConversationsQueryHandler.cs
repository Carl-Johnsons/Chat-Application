using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetAllConversationsQuery : IRequest<List<Conversation>>;

public class GetAllConversationsQueryHandler : IRequestHandler<GetAllConversationsQuery, List<Conversation>>
{
    private readonly IApplicationDbContext _context;

    public GetAllConversationsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Conversation>> Handle(GetAllConversationsQuery request, CancellationToken cancellationToken)
    {
        // Fetch data from the database
        var conversations = await _context.Conversations
            .Include(c => c.Users) // Assuming there's a navigation property for Users
            .ToListAsync(cancellationToken);

        return conversations;
    }
}
