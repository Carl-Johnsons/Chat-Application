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
public record CreateMultipleCloudinaryImageFileCommand : IRequest<List<CloudinaryFile>?>
{
    [Required]
    public List<IFormFile> FormFiles { get; init; } = null!;
}
public class CreateMultipleCloudinaryImageFileCommandHandler : IRequestHandler<CreateMultipleCloudinaryImageFileCommand, List<CloudinaryFile>?>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly Cloudinary _cloudinary;

    public CreateMultipleCloudinaryImageFileCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, Cloudinary cloudinary)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _cloudinary = cloudinary;
    }

    public async Task<List<CloudinaryFile>?> Handle(CreateMultipleCloudinaryImageFileCommand request, CancellationToken cancellationToken)
    {
        try
        {
            var formFiles = request.FormFiles;

            if (formFiles == null || !formFiles.Any())
            {
                await Console.Out.WriteLineAsync("The file list cannot be null or empty.command");
                await Console.Out.WriteLineAsync("form file count:" + formFiles?.Count);
                throw new ArgumentNullException(nameof(formFiles), "The file list cannot be null or empty.");
            }

            if (formFiles.Any(file => file == null)) throw new ArgumentException("File list contains a null element.", nameof(formFiles));

            var returnResult = Enumerable.Repeat(new CloudinaryFile(), formFiles.Count).ToList();
            var uploadResults = Enumerable.Repeat(new ImageUploadResult(), formFiles.Count).ToList();
            var formFileNames = Enumerable.Repeat(string.Empty, formFiles.Count).ToList();
            var formFileSizes = Enumerable.Repeat(0L, formFiles.Count).ToList();
            var extensionValues = Enumerable.Repeat(string.Empty, formFiles.Count).ToList();

            //Used to store new extension type that not in DB
            List<ExtensionType> newExtensionTypes = new List<ExtensionType>();

            await Console.Out.WriteLineAsync("FormFile count command:"+formFiles.Count);
            var tasks = formFiles.Select(async (formFile, index) =>
            {
                await Console.Out.WriteLineAsync("asyn index:"+index);
                string fileName = formFile.FileName;
                Stream fileStream = formFile.OpenReadStream();
                formFileNames[index] = fileName;
                formFileSizes[index] = fileStream.Length;
                extensionValues[index] = Path.GetExtension(fileName);
                if (getFileType(fileName) != "Image")
                {
                    throw new Exception("Invalid file (image), chosen file: " + Path.GetExtension(fileName));
                }

                var uploadParams = new ImageUploadParams()
                {
                    File = new FileDescription(fileName, fileStream),
                    PublicId = Guid.NewGuid().ToString() + fileName.Substring(0, fileName.LastIndexOf(".")),
                    Folder = Environment.GetEnvironmentVariable("Cloudinary_Folder"),
                };
                var uploadResult = await _cloudinary.UploadAsync(uploadParams);
                uploadResults[index] = uploadResult;
            }).ToList();
            await Task.WhenAll(tasks);

            //check if all image upload to cloud susscess
            if (uploadResults.Any(result => result.StatusCode != HttpStatusCode.OK)) throw new Exception($"Failed to upload image, delete all remain image file");
            await Console.Out.WriteLineAsync("Upload result count:"+uploadResults.Count);
            for (int i = 0; i < uploadResults.Count; i++)
            {
                var uploadResult = uploadResults[i];

                string publicId = uploadResult.PublicId;
                string name = formFileNames[i];
                long size = formFileSizes[i];
                string url = uploadResult.Url.ToString();
                string extensionValue = Path.GetExtension(name);

                var extensionType = await _context.ExtensionTypes.Where(et => et.Value == extensionValue)
                    .SingleOrDefaultAsync(cancellationToken);
                //extensionValues.Take(i).All(et => et != extensionValue) return true if this extensionValue appear first in the list
                // ex: LIST: {A B C D B A} index 1 = B will return true, index 4 = B return false
                //This condition to remove needless _context.ExtensionTypes.Add(extensionType);
                if (extensionType == null && extensionValues.Take(i).All(et => et != extensionValue))
                {
                    extensionType = new ExtensionType
                    {
                        Value = extensionValue,
                        Code = extensionValue.Replace(".", "").ToUpper(),
                        Type = getFileType(name).ToUpper(),
                    };
                    newExtensionTypes.Add(extensionType);
                    _context.ExtensionTypes.Add(extensionType);

                }
                var cloudinaryFile = new CloudinaryFile
                {
                    Name = name,
                    PublicId = publicId,
                    Size = size,
                    Url = url,
                    ExtensionTypeId = extensionType != null ? extensionType.Id : 
                    newExtensionTypes.FirstOrDefault(et => et.Value == extensionValues[i])!.Id,
                };
                _context.CloudinaryFiles.Add(cloudinaryFile);
                returnResult[i] = cloudinaryFile;
            }
            await _unitOfWork.SaveChangeAsync(cancellationToken);
            await Console.Out.WriteLineAsync("return result count:"+returnResult.Count);
            return returnResult;
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
