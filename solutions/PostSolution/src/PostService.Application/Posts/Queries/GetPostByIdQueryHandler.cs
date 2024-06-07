using MediatR;
using Microsoft.EntityFrameworkCore;
namespace PostService.Application.Posts.Queries;

public class GetPostByIdQuery : IRequest <Post>
{
    public Guid Id { get; set; }
}

public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, Post>
{
    private readonly IApplicationDbContext _context;

    public GetPostByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Post> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
    {
        var post = await _context.Posts
                    .Where(p => p.Id == request.Id)
                    .SingleOrDefaultAsync();

        return post;
    }
}
