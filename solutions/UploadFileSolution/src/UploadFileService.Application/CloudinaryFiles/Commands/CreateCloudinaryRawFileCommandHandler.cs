using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.Net;
using UploadFileService.Domain.Entities;
using UploadFileService.Domain.Interfaces;

namespace UploadFileService.Application.CloudinaryFiles.Commands;
public record CreateCloudinaryRawFileCommand : IRequest<CloudinaryFile?>
{
    [Required]
    public IFormFile FormFile { get; init; } = null!;
}
public class CreateCloudinaryRawFileCommandHandler : IRequestHandler<CreateCloudinaryRawFileCommand, CloudinaryFile?>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly Cloudinary _cloudinary;

    public CreateCloudinaryRawFileCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, Cloudinary cloudinary)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _cloudinary = cloudinary;
    }

    public async Task<CloudinaryFile?> Handle(CreateCloudinaryRawFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var formFile = request.FormFile;

            if (formFile == null || formFile.Length == 0)
            {
                return null;
            }

            string fileName = formFile.FileName;
            Stream fileStream = formFile.OpenReadStream();

            if (getFileType(fileName) != "Raw")
            {
                throw new Exception("Invalid file (raw), chosen file: " + Path.GetExtension(fileName));
            }

            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(fileName, fileStream),
                PublicId = Guid.NewGuid().ToString() + fileName,
                Folder = Environment.GetEnvironmentVariable("Cloudinary_Folder"),
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);
            CloudinaryFile? cloudinaryFile = null;
            if (uploadResult.StatusCode == HttpStatusCode.OK)
            {
                string publicId = uploadResult.PublicId;
                string name = fileName;
                long size = formFile.Length;
                string url = uploadResult.Url.ToString();
                string extensionValue = Path.GetExtension(fileName);
                var extensionType = await _context.ExtensionTypes.Where(et => et.Value == extensionValue)
                    .SingleOrDefaultAsync(cancellationToken);
                if (extensionType != null)
                {
                    cloudinaryFile = new CloudinaryFile
                    {
                        Name = name,
                        PublicId = publicId,
                        Size = size,
                        Url = url,
                        ExtensionTypeId = extensionType.Id,
                    };
                    _context.CloudinaryFiles.Add(cloudinaryFile);
                }
                else
                {
                    extensionType = new ExtensionType
                    {
                        Value = extensionValue,
                        Code = extensionValue.Replace(".", "").ToUpper(),
                        Type = getFileType(fileName).ToUpper(),
                    };
                    _context.ExtensionTypes.Add(extensionType);
                    cloudinaryFile = new CloudinaryFile
                    {
                        Name = name,
                        PublicId = publicId,
                        Size = size,
                        Url = url,
                        ExtensionTypeId = extensionType.Id,
                    };
                    _context.CloudinaryFiles.Add(cloudinaryFile);
                }
            }
            await _unitOfWork.SaveChangeAsync(cancellationToken);
            return cloudinaryFile;
        }
        catch (Exception ex)
        {
            await Console.Out.WriteLineAsync(ex.Message);
        }
        return null;


    }

    public string getFileType(string fileName)
    {
        List<string> imageExtensions = new List<string>
        {
            ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp",
            ".svg", ".ico", ".heic", ".heif", ".raw", ".cr2", ".nef", ".orf",
            ".sr2", ".arw", ".dng", ".raf", ".3fr", ".kdc", ".mos", ".mef",
            ".nrw", ".rw2", ".pef"
        };

        List<string> videoExtensions = new List<string>
        {
            ".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm", ".mpeg",
            ".mpg", ".m4v", ".3gp", ".3g2", ".vob", ".ogv", ".m2ts", ".mts",
            ".ts", ".mxf", ".f4v", ".rm", ".rmvb", ".divx", ".xvid", ".dv",
            ".asf", ".swf", ".m2v",".mp3", ".wav", ".aac", ".flac", ".ogg", ".wma", ".m4a",
            ".aiff", ".alac", ".opus", ".amr"
        };

        if (fileName == null || fileName.Length == 0)
        {
            return "Invalid";
        }

        string extension = Path.GetExtension(fileName);
        if (imageExtensions.Contains(extension))
        {
            return "Image";
        }

        else if (videoExtensions.Contains(extension))
        {
            return "Video";
        }

        else
        {
            return "Raw";
        }

    }
}
