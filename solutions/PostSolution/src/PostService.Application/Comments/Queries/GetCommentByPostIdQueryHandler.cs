using MediatR;
using Microsoft.EntityFrameworkCore;

namespace PostService.Application.Comments.Queries;

public class GetCommentByPostIdQuery : IRequest<List<PostComment>>
{
    public Guid PostId { get; init; }
}

public class GetCommentByPostIdQueryHandler : IRequestHandler<GetCommentByPostIdQuery, List<PostComment>>
{
    private readonly IApplicationDbContext _context;

    public GetCommentByPostIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<PostComment>> Handle(GetCommentByPostIdQuery request, CancellationToken cancellationToken)
    {
        var comments = await _context.PostComments
                            .Where(c => c.PostId == request.PostId)
                            .Include(c => c.Comment)
                            .ToListAsync();

        return comments;
    }
}
