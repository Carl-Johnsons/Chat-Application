using MediatR;
using Microsoft.EntityFrameworkCore;
using PostService.Domain.Common;
using PostService.Domain.Errors;

namespace PostService.Application.Comments.Queries;

public class GetCommentByPostIdQuery : IRequest<Result<List<PostComment>>>
{
    public Guid PostId { get; init; }
}

public class GetCommentByPostIdQueryHandler : IRequestHandler<GetCommentByPostIdQuery, Result<List<PostComment>>>
{
    private readonly IApplicationDbContext _context;

    public GetCommentByPostIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<List<PostComment>>> Handle(GetCommentByPostIdQuery request, CancellationToken cancellationToken)
    {
        var post = _context.Posts
                            .Where(p => p.Id == request.PostId)
                            .SingleOrDefault();

        if (post == null)
        {
            return Result<List<PostComment>>.Failure(PostError.NotFound);
        }

        var comments = await _context.PostComments
                            .Where(c => c.PostId == request.PostId)
                            .Include(c => c.Comment)
                            .ToListAsync();

        

        return Result<List<PostComment>>.Success(comments);
    }
}
