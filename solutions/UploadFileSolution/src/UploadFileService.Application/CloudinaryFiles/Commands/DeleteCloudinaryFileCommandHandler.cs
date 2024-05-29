using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using UploadFileService.Domain.Interfaces;

namespace UploadFileService.Application.CoudinaryFiles.Commands;
public record DeleteCloudinaryFileCommand : IRequest<string>
{
    [Required]
    public Guid? Id { get; init; }
}
public class DeleteCloudinaryFileCommandHandler : IRequestHandler<DeleteCloudinaryFileCommand, string>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly Cloudinary _cloudinary;

    public DeleteCloudinaryFileCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, Cloudinary cloudinary)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _cloudinary = cloudinary;
    }

    public async Task<string> Handle(DeleteCloudinaryFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            Guid? Id = request.Id;

            if (Id == null)
            {
                throw new Exception("Cloudinary File Id is null");
            }

            var cloudinaryFile = await _context.CloudinaryFiles.Where(cf => cf.Id == Id).Include(cf=>cf.ExtensionType).SingleOrDefaultAsync();


            if (cloudinaryFile == null || cloudinaryFile.PublicId == null)
            {
                throw new Exception("Not found file to delete");
            }

            ResourceType rst;
            switch (cloudinaryFile.ExtensionType.Type)
            {
                case "IMAGE":
                    rst = ResourceType.Image;
                    break;
                case "VIDEO":
                    rst = ResourceType.Video;
                    break;
                case "RAW":
                    rst = ResourceType.Raw;
                    break;
                default:
                    throw new Exception("Invalid file type");
            }

            var deleteParams = new DeletionParams(cloudinaryFile.PublicId)
            {
                ResourceType = rst,
            };
            var deleteResult = _cloudinary.Destroy(deleteParams);

            if (deleteResult.StatusCode == HttpStatusCode.OK) {
                await Console.Out.WriteLineAsync("deleteok!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                _context.CloudinaryFiles.Remove(cloudinaryFile);
                await _unitOfWork.SaveChangeAsync(cancellationToken);
                return "Delete file: " +cloudinaryFile.PublicId+" successful!";
            }
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
            return "Delete file fail with exeption: "+ ex.Message;
        }
        return "Delete file fail";
    }
}
