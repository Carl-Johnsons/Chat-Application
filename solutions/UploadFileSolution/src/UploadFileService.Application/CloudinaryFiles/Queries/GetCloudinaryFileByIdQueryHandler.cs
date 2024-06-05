using MediatR;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using UploadFileService.Domain.Entities;
using UploadFileService.Domain.Interfaces;

namespace UploadFileService.Application.CloudinaryFiles.Queries;

public record GetCloudinaryFileByIdQuery : IRequest<CloudinaryFile?>
{
    [Required]
    public Guid? Id { get; init; }
}
public class GetCloudinaryFileByIdQueryHandler : IRequestHandler<GetCloudinaryFileByIdQuery, CloudinaryFile?>
{
    private readonly IApplicationDbContext _context;

    public GetCloudinaryFileByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CloudinaryFile?> Handle(GetCloudinaryFileByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.CloudinaryFiles.Where(cf => cf.Id == request.Id).Include(cf => cf.ExtensionType).SingleOrDefaultAsync(cancellationToken);
    }
}
