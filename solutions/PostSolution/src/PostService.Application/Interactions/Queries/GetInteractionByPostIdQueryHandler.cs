using MediatR;
using Microsoft.EntityFrameworkCore;

namespace PostService.Application.Interactions.Queries;

public class GetInteractionByPostIdQuery : IRequest<List<PostInteract>>
{
    public Guid PostId { get; init; }
}

public class GetInteractionByPostIdQueryHandler : IRequestHandler<GetInteractionByPostIdQuery, List<PostInteract>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public GetInteractionByPostIdQueryHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<PostInteract>> Handle(GetInteractionByPostIdQuery request, CancellationToken cancellationToken)
    {
        var interactions = await _context.PostInteracts
                            .Where(i => i.PostId == request.PostId)
                            .ToListAsync();

        return interactions;
    }
}
