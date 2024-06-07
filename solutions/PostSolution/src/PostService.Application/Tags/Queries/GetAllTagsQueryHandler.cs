using MediatR;
using Microsoft.EntityFrameworkCore;

namespace PostService.Application.Tags.Queries;

public record GetAllTagsQuery : IRequest<List<Tag>>;

public class GetAllTagsQueryHandler : IRequestHandler<GetAllTagsQuery, List<Tag>>
{
    private readonly IApplicationDbContext _context;

    public GetAllTagsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Tag>> Handle(GetAllTagsQuery request, CancellationToken cancellationToken)
    {
        var tag = await _context.Tags
                    .ToListAsync(cancellationToken);
        return tag;
    }
}
