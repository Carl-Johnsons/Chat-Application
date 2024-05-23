using ConversationService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetConversationListByUserIdQuery : IRequest<List<Conversation>>
{
    public Guid UserId { get; init; }
};

public class GetConversationListByUserIdQueryHandler : IRequestHandler<GetConversationListByUserIdQuery, List<Conversation>>
{
    private readonly ApplicationDbContext _context;

    public GetConversationListByUserIdQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Conversation>> Handle(GetConversationListByUserIdQuery request, CancellationToken cancellationToken)
    {
        var filteredConversations = _context.Conversations
            .Include(c => c.Users)
            .Where(c => c.Users.Any(u => u.UserId == request.UserId))
            .ToList();

        // Remove the current user from the Users array
        foreach (var conversation in filteredConversations)
        {
            conversation.Users = conversation.Users
                .Where(u => u.UserId != request.UserId)
                .ToList();
        }

        return Task.FromResult(filteredConversations);

    }
}
