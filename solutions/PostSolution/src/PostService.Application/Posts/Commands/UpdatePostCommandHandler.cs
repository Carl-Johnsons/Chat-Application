using MediatR;
using PostService.Domain.Common;
using PostService.Domain.Errors;
namespace PostService.Application.Posts.Commands;

public class UpdatePostCommand : IRequest<Result>
{
    public Guid PostId { get; init;}
    public string Content { get; init; } = null!;
}

public class UpdatePostCommandHanlder : IRequestHandler<UpdatePostCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public UpdatePostCommandHanlder(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(UpdatePostCommand request, CancellationToken cancellationToken)
    {
        var post = _context.Posts
                        .Where(p => p.Id == request.PostId)
                        .SingleOrDefault();

        if (post != null)
        {
            post.Content = request.Content;
            await _unitOfWork.SaveChangeAsync(cancellationToken);

            return Result.Success();
        } else
        {
            return Result.Failure(PostError.NotFound);
        }
        
        
    }
}
