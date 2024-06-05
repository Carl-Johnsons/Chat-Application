using MediatR;
namespace PostService.Application.Posts.Commands;

public class CreatePostCommand : IRequest
{
    public string PostContent { get; init; } = null!;
    public Guid UserId { get; init; }
}

public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        Post post = new Post
        {
            Content = request.PostContent,
            UserId = request.UserId
        };

        _context.Posts.Add(post);
        await _unitOfWork.SaveChangeAsync();

    }
}
