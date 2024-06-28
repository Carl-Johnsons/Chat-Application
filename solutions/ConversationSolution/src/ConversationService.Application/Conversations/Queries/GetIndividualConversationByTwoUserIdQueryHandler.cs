
using ConversationService.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetIndividualConversationByTwoUserIdQuery : IRequest<Result<Conversation?>>
{
    public Guid UserId { get; init; }
    public Guid OtherUserId { get; init; }
}

public class GetIndividualConversationByTwoUserIdQueryHandler : IRequestHandler<GetIndividualConversationByTwoUserIdQuery, Result<Conversation?>>
{
    private readonly IApplicationDbContext _context;

    public GetIndividualConversationByTwoUserIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Conversation?>> Handle(GetIndividualConversationByTwoUserIdQuery request, CancellationToken cancellationToken)
    {
        var conversations = await _context.Conversations
            .Include(c => c.Users)
            .Where(c => c.Users.Any(cu => cu.UserId == request.UserId) && 
                        c.Users.Any(cu => cu.UserId == request.OtherUserId) &&
                        c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL)
            .SingleOrDefaultAsync(cancellationToken);

        return Result<Conversation?>.Success(conversations);

    }
}