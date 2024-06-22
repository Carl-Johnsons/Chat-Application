using MediatR;
using PostService.Domain.Common;
namespace PostService.Application.Posts.Commands;

public class CreatePostCommand : IRequest<Result<Post>>
{
    public string Content { get; init; } = null!;
    public Guid UserId { get; init; }
}

public class CreatePostCommandHandler : IRequestHandler<CreatePostCommand, Result<Post>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<Post>> Handle(CreatePostCommand request, CancellationToken cancellationToken)
    {
        Post post = new Post
        {
            Content = request.Content,
            UserId = request.UserId
        };

        _context.Posts.Add(post);

        await _unitOfWork.SaveChangeAsync();

        return Result<Post>.Success(post);
    }
}
