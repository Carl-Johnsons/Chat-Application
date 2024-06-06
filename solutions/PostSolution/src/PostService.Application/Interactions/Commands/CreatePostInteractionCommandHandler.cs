using MediatR;

namespace PostService.Application.Interactions.Commands;

public class CreatePostInteractionCommand : IRequest
{
    public Guid PostId { get; init; }
    public Guid InteractionId { get; init; }
    public Guid UserId { get; init; }
}

public class CreatePostInteractionCommandHandler : IRequestHandler<CreatePostInteractionCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostInteractionCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreatePostInteractionCommand request, CancellationToken cancellationToken)
    {
        PostInteract postInteract = new PostInteract
        {
            PostId = request.PostId,
            InteractionId = request.InteractionId,
            UserId = request.UserId
        };

        _context.PostInteracts.Add(postInteract);
        await _unitOfWork.SaveChangeAsync();
    }
}
