using MediatR;

namespace PostService.Application.Tags.Commands;

public class CreatePostTagCommand : IRequest
{
    public Guid PostId { get; init; }
    public Guid TagId { get; init; }
}

public class CreatePostTagCommandHandler : IRequestHandler<CreatePostTagCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostTagCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreatePostTagCommand request, CancellationToken cancellationToken)
    {
        _context.PostTags.Add(new PostTag
        {
            PostId = request.PostId,
            TagId = request.TagId
        });

        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
