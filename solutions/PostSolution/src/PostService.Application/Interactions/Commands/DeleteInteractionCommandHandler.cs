using MediatR;

namespace PostService.Application.Interactions.Commands;

public class DeleteInteractionCommand : IRequest
{
    public Guid Id { get; set; }
}

public class DeleteInteractionCommandHandler : IRequestHandler<DeleteInteractionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public DeleteInteractionCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(DeleteInteractionCommand request, CancellationToken cancellationToken)
    {
        var interaction = _context.Interactions
                            .Where(it => it.Id == request.Id)
                            .SingleOrDefault();

        if (interaction != null)
        {
            _context.Interactions.Remove(interaction);
        }

        await _unitOfWork.SaveChangeAsync();
    }
}
