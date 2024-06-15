using MediatR;
using PostService.Domain.Common;
using PostService.Domain.Errors;

namespace PostService.Application.Interactions.Commands;

public class CreatePostInteractionCommand : IRequest<Result>
{
    public Guid PostId { get; init; }
    public Guid InteractionId { get; init; }
    public Guid UserId { get; init; }
}

public class CreatePostInteractionCommandHandler : IRequestHandler<CreatePostInteractionCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostInteractionCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreatePostInteractionCommand request, CancellationToken cancellationToken)
    {

        var post = _context.Posts
                    .Where(p => p.Id == request.PostId)
                    .FirstOrDefault();

        if (post == null)
        {
            return Result.Failure(PostError.NotFound);
        }

        var interact = _context.Interactions
                        .Where(i => i.Id == request.InteractionId)
                        .FirstOrDefault();

        if (interact == null)
        {
            return Result.Failure(InteractionError.NotFound);
        }

       var postInteraction = _context.PostInteracts
                            .Where(pi => pi.UserId == request.PostId && pi.UserId == request.UserId)
                            .FirstOrDefault();

        if (postInteraction != null)
        {
            return Result.Failure(PostError.AlreadyInteractedPost);
        }

        PostInteract postInteract = new PostInteract
        {
            PostId = request.PostId,
            InteractionId = request.InteractionId,
            UserId = request.UserId
        };

        _context.PostInteracts.Add(postInteract);
        await _unitOfWork.SaveChangeAsync();

        return Result.Success();
    }
}
