using MediatR;
using PostService.Domain.Common;
using PostService.Domain.Errors;

namespace PostService.Application.Posts.Commands;

public class CreatePostReportCommand : IRequest<Result>
{
    public Guid PostId { get; init; }
    public Guid UserId { get; init; }
    public string Reason { get; init; } = null!;
}

public class CreatePostReportCommandHandler : IRequestHandler<CreatePostReportCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreatePostReportCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreatePostReportCommand request, CancellationToken cancellationToken)
    {
        var post = _context.Posts
                    .Where(p => p.Id == request.PostId)
                    .SingleOrDefault();

        if (post == null)
        {
            return Result.Failure(PostError.NotFound);
        }
        var postReport = _context.PostReports
                            .Where(rp => rp.PostId == request.PostId && rp.UserId == request.UserId)
                            .SingleOrDefault();
        if (postReport != null)
        {
            return Result.Failure(PostError.AlreadyReportedPost);
        }

        var rp = new PostReport
        {
            PostId = request.PostId,
            UserId = request.UserId,
            Reason = request.Reason,
        };

        _context.PostReports.Add(rp);
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}