using MediatR;

namespace PostService.Application.Comments.Commands;

public class CreateCommentCommand : IRequest<Comment>
{
    public string Content { get; init; } = null!;
    public Guid UserId { get; init; }
}

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Comment>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateCommentCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Comment> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {
        Comment comment = new Comment
        {
            Content = request.Content,
            UserId = request.UserId
        };

        _context.Comments.Add(comment);

        await _unitOfWork.SaveChangeAsync();

        return comment;
    }
}
