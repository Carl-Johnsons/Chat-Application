using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.JSInterop.Infrastructure;
using System.Net.Http.Headers;

namespace UploadFileService.API.Controllers;

[Route("api/upload")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly Cloudinary cloudinary;

    public UploadController()
    {
        DotNetEnv.Env.Load();
        cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("Cloudinary_URL"));
        cloudinary.Api.Secure = true;
    }




    [HttpPost("image")]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        try
        {

            if (file == null || file.Length == 0)
            {
                return BadRequest("File object is null");
            }

            string fileName = file.FileName;
            fileName = fileName.Substring(0, fileName.LastIndexOf("."));
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(fileName, fileStream),
                PublicId = Guid.NewGuid().ToString() + fileName,
                Folder = Environment.GetEnvironmentVariable("Cloudinary_Folder"),
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            return Content(uploadResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("video")]
    public async Task<IActionResult> UploadVideo(IFormFile file)
    {
        try
        {

            if (file == null || file.Length == 0)
            {
                return BadRequest("File object is null");
            }

            string fileName = file.FileName;
            fileName = fileName.Substring(0, fileName.LastIndexOf("."));
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new VideoUploadParams()
            {
                File = new FileDescription(fileName, fileStream),
                PublicId = Guid.NewGuid().ToString() + fileName,
                Folder = Environment.GetEnvironmentVariable("Cloudinary_Folder"),
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            return Content(uploadResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("raw")]
    public async Task<IActionResult> UploadRaw(IFormFile file)
    {
        try
        {

            if (file == null || file.Length == 0)
            {
                return BadRequest("File object is null");
            }

            string fileName = file.FileName;
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new RawUploadParams()
            {
                File = new FileDescription(fileName, fileStream),
                PublicId = Guid.NewGuid().ToString() + fileName,
                Folder = Environment.GetEnvironmentVariable("Cloudinary_Folder"),
            };
            var uploadResult = cloudinary.Upload(uploadParams);
            return Content(uploadResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("image")]
    public async Task<IActionResult> DeleteImage([FromForm] string fileId)
    {
        try
        {

            if (fileId == null || fileId == "")
            {
                return BadRequest("FileId is null");
            }


            var deleteParams = new DeletionParams(fileId)
            {
                ResourceType = ResourceType.Image
            };
            var deleteResult = cloudinary.Destroy(deleteParams);
            return Content(deleteResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("video")]
    public async Task<IActionResult> DeleteVideo([FromForm] string fileId)
    {
        try
        {

            if (fileId == null || fileId == "")
            {
                return BadRequest("FileId is null");
            }


            var deleteParams = new DeletionParams(fileId)
            {
                ResourceType = ResourceType.Video
            };
            var deleteResult = cloudinary.Destroy(deleteParams);
            return Content(deleteResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("raw")]
    public async Task<IActionResult> DeleteRaw([FromForm] string fileId)
    {
        try
        {

            if (fileId == null || fileId == "")
            {
                return BadRequest("FileId is null");
            }


            var deleteParams = new DeletionParams(fileId)
            {
                ResourceType = ResourceType.Raw
            };
            var deleteResult = cloudinary.Destroy(deleteParams);
            return Content(deleteResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
