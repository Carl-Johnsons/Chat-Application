using MediatR;
using Microsoft.EntityFrameworkCore;
using PostService.Domain.Common;
using PostService.Domain.Errors;

namespace PostService.Application.Interactions.Queries;

public class GetInteractionByPostIdQuery : IRequest<Result<List<PostInteract>>>
{
    public Guid PostId { get; init; }
}

public class GetInteractionByPostIdQueryHandler : IRequestHandler<GetInteractionByPostIdQuery, Result<List<PostInteract>>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public GetInteractionByPostIdQueryHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<List<PostInteract>>> Handle(GetInteractionByPostIdQuery request, CancellationToken cancellationToken)
    {
        var post = _context.Posts
                    .Where(p => p.Id == request.PostId)
                    .FirstOrDefault();

        if (post == null)
        {
            return Result<List<PostInteract>>.Failure(PostError.NotFound);
        }

        var interactions = await _context.PostInteracts
                            .Where(i => i.PostId == request.PostId)
                            .ToListAsync();

        return Result<List<PostInteract>>.Success(interactions);
    }
}
