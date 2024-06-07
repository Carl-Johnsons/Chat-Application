using MediatR;
using Microsoft.EntityFrameworkCore;
namespace PostService.Application.Posts.Queries;

public class GetPostsByUserIdQuery : IRequest<List<Post>>
{
    public Guid UserId { get; init; }
}

public class GetPostsByUserIdQueryHandler : IRequestHandler<GetPostsByUserIdQuery, List<Post>>
{
    private readonly IApplicationDbContext _context;

    public GetPostsByUserIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Post>> Handle(GetPostsByUserIdQuery request, CancellationToken cancellationToken)
    {
        var posts = await _context.Posts
                        .Where(p => p.UserId == request.UserId)
                        .ToListAsync();
        return posts;
    }
}
