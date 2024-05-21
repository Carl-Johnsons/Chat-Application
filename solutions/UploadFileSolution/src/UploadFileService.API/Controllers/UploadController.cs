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

    public UploadController() {
        DotNetEnv.Env.Load();
        cloudinary = new Cloudinary(Environment.GetEnvironmentVariable("Cloudinary_URL"));
        cloudinary.Api.Secure = true;
    }


   

    [HttpPost]
    public async Task<IActionResult> UploadFile(IFormFile file)
    {
        try
        {
            
            if (file == null || file.Length == 0)
            {
                return BadRequest("File object is null");
            }

            string fileName = file.FileName;
            Stream fileStream = file.OpenReadStream();

            var uploadParams = new AutoUploadParams()
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

    [HttpDelete]
    public async Task<IActionResult> DeleteFile([FromForm] string fileId)
    {
        try
        {

            if (fileId == null || fileId == "")
            {
                return BadRequest("FileId is null");
            }

            var deleteParams = new DeletionParams(fileId) {
                ResourceType = ResourceType.Raw};
            var deleteResult = cloudinary.Destroy(deleteParams);
            return Content(deleteResult.JsonObj.ToString(), "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

}
