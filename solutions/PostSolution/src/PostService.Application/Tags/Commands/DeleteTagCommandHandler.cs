using MediatR;

namespace PostService.Application.Tags.Commands;

public class DeleteTagCommand : IRequest
{
    public Guid TagId { get; init; }
}

public class DeleteTagCommandHandler : IRequestHandler<DeleteTagCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteTagCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteTagCommand request, CancellationToken cancellationToken)
    {
        var tag = _context.Tags
                    .Where(t => t.Id == request.TagId)
                    .FirstOrDefault();
        if (tag != null)
        {
            _context.Tags.Remove(tag);
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
