using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetConversationByIdQuery : IRequest<Result<Conversation?>>
{
    public Guid ConversationId { get; init; }
};
public class GetConversationQueryHandlers : IRequestHandler<GetConversationByIdQuery, Result<Conversation?>>
{
    private readonly IApplicationDbContext _context;

    public GetConversationQueryHandlers(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Conversation?>> Handle(GetConversationByIdQuery request, CancellationToken cancellationToken)
    {
        var conversation = await _context.Conversations
                                .Where(c => c.Id == request.ConversationId)
                                .SingleOrDefaultAsync(cancellationToken);
        if (conversation == null)
        {
            return Result<Conversation?>.Failure(ConversationError.NotFound);
        }

        return Result<Conversation?>.Success(conversation);
    }
}
