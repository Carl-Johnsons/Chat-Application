using MediatR;
using Microsoft.EntityFrameworkCore;
using UploadFileService.Domain.Entities;
using UploadFileService.Domain.Interfaces;

namespace UploadFileService.Application.CloudinaryFiles.Queries;

public record GetAllCloudinaryFilesQuery : IRequest<IEnumerable<CloudinaryFile>>
{
}
public class GetAllCloudinaryFilesQueryHandler : IRequestHandler<GetAllCloudinaryFilesQuery, IEnumerable<CloudinaryFile>>
{
    private readonly IApplicationDbContext _context;

    public GetAllCloudinaryFilesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<CloudinaryFile>> Handle(GetAllCloudinaryFilesQuery request, CancellationToken cancellationToken)
    {
        return await _context.CloudinaryFiles.Include(cf => cf.ExtensionType).ToListAsync();
    }
}
