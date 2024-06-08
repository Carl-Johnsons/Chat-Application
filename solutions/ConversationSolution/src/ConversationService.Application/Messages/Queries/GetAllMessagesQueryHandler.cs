using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;
public record GetAllMessagesQuery : IRequest<Result<List<Message>>>;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, Result<List<Message>>>
{
    private readonly IApplicationDbContext _context;

    public GetAllMessagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<Message>>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Messages.ToListAsync(cancellationToken);

        return Result<List<Message>>.Success(result);
    }
}
