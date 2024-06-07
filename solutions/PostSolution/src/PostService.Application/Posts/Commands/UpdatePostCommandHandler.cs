using MediatR;
namespace PostService.Application.Posts.Commands;

public class UpdatePostCommand : IRequest
{
    public Guid PostId { get; init;}
    public string Content { get; init; } = null!;
}

public class UpdatePostCommandHanlder : IRequestHandler<UpdatePostCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public UpdatePostCommandHanlder(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var post = _context.Posts
                        .Where(p => p.Id == request.PostId)
                        .SingleOrDefault();

        await Console.Out.WriteLineAsync(request.PostId.ToString());

        if (post != null)
        {
            post.Content = request.Content;
        }
        
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
