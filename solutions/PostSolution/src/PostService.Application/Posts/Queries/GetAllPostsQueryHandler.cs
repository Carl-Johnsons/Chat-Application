using MediatR;
using Microsoft.EntityFrameworkCore;

namespace PostService.Application.Posts.Queries;

public class GetAllPostsQuery : IRequest<List<Post>>;

public class GetAllPostsQueryHandler : IRequestHandler<GetAllPostsQuery, List<Post>>
{
    private readonly IApplicationDbContext _context;

    public GetAllPostsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Post>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
    {
        var posts = await _context.Posts.ToListAsync();

        return posts;
    }
}
