using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;
public record GetAllMessagesQuery : IRequest<List<Message>>;

public class GetAllMessagesQueryHandler : IRequestHandler<GetAllMessagesQuery, List<Message>>
{
    private readonly IApplicationDbContext _context;

    public GetAllMessagesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Message>> Handle(GetAllMessagesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Messages.ToListAsync(cancellationToken);
    }
}
