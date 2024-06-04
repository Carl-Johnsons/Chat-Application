using MediatR;
using Microsoft.EntityFrameworkCore;

namespace PostService.Application.Interactions.Queries;

public class GetAllInteractionsQuery : IRequest<List<Interaction>>;

public class GetAllInteractionsQueryHandler : IRequestHandler<GetAllInteractionsQuery, List<Interaction>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public GetAllInteractionsQueryHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<List<Interaction>> Handle(GetAllInteractionsQuery request, CancellationToken cancellationToken)
    {
        var interactions = await _context.Interactions.ToListAsync(cancellationToken);

        return interactions;
    }
}
