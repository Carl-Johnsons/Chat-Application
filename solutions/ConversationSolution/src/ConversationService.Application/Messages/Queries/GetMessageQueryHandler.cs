using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;

public record GetMessageQuery : IRequest<Message?>
{
    public Guid MessageId { get; init; }

};

public class GetMessageQueryHandler : IRequestHandler<GetMessageQuery, Message?>
{
    private readonly IApplicationDbContext _context;

    public GetMessageQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Message?> Handle(GetMessageQuery request, CancellationToken cancellationToken)
    {
        return await _context.Messages.Where(m => m.Id == request.MessageId).SingleOrDefaultAsync(cancellationToken);
    }
}
