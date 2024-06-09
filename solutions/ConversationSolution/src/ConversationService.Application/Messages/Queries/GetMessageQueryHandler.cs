using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;

public record GetMessageQuery : IRequest<Result<Message?>>
{
    public Guid MessageId { get; init; }

};

public class GetMessageQueryHandler : IRequestHandler<GetMessageQuery, Result<Message?>>
{
    private readonly IApplicationDbContext _context;

    public GetMessageQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<Message?>> Handle(GetMessageQuery request, CancellationToken cancellationToken)
    {
        var result = await _context.Messages.Where(m => m.Id == request.MessageId).SingleOrDefaultAsync(cancellationToken);

        return Result<Message?>.Success(result);
    }
}
