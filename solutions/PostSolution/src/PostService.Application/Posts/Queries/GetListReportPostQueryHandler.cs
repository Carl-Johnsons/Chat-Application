using MediatR;
using Microsoft.EntityFrameworkCore;
using PostService.Domain.Common;
using PostService.Domain.DTOs;

namespace PostService.Application.Posts.Queries;

public class GetListReportPostQuery : IRequest<Result<List<PostReportListDTO>?>>
{
}
public class GetListReportPostQueryHandler : IRequestHandler<GetListReportPostQuery, Result<List<PostReportListDTO>?>>
{
    private readonly IApplicationDbContext _context;

    public GetListReportPostQueryHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
    }

    public async Task<Result<List<PostReportListDTO>?>> Handle(GetListReportPostQuery request, CancellationToken cancellationToken)
    {
        var posts = await _context.PostReports
                    .GroupBy (p => p.PostId)
                    .Select(p => new PostReportListDTO
                    {
                        PostId = p.Key,
                        PostCount = p.Count()
                    })
                    .OrderByDescending(p => p.PostCount)
                    .ToListAsync();

        return Result<List<PostReportListDTO>?>.Success(posts);                
    }
}

