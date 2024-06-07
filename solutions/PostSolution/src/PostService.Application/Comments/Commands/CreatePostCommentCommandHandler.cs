using MediatR;

namespace PostService.Application.Comments.Commands;

public class CreatePostCommentCommand : IRequest
{
    public Guid PostId { get; init; }
    public Guid CommentId { get; init; }
}

public class CreatePostCommentCommandHandler : IRequestHandler<CreatePostCommentCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostCommentCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreatePostCommentCommand request, CancellationToken cancellationToken)
    {
        PostComment postCommment = new PostComment
        {
            PostId = request.PostId,
            CommentId = request.CommentId
        };

        _context.PostComments.Add(postCommment);
        await _unitOfWork.SaveChangeAsync();
    }
}
