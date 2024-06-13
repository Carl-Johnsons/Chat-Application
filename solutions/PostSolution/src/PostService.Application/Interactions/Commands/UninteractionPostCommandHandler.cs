using MediatR;
using PostService.Domain.Common;

namespace PostService.Application.Interactions.Commands;

public class UninteractionPostCommand : IRequest<Result>
{
    public Guid PostId { get; init; }
    public Guid InteractionId { get; init; }
    public Guid UserId { get; init; }
}

public class UninteractionPostCommandHandler : IRequestHandler<UninteractionPostCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public UninteractionPostCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(UninteractionPostCommand request, CancellationToken cancellationToken)
    {
        var result = _context.PostInteracts
                        .Where(p => p.InteractionId ==  request.InteractionId && p.UserId == request.UserId && p.PostId == request.PostId)
                        .SingleOrDefault();

        if (result != null)
        {
            _context.PostInteracts.Remove(result);
        }
        await _unitOfWork.SaveChangeAsync();

        return Result.Success();
    }
}
