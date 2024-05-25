using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetConversationQuery : IRequest<Conversation?>
{
    public Guid ConversationId { get; init; }
};
public class GetConversationQueryHandlercs : IRequestHandler<GetConversationQuery, Conversation?>
{
    private readonly IApplicationDbContext _context;

    public GetConversationQueryHandlercs(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Conversation?> Handle(GetConversationQuery request, CancellationToken cancellationToken)
    {
        return await _context.Conversations
                            .Where(c => c.Id == request.ConversationId)
                            .SingleOrDefaultAsync(cancellationToken);
    }
}
