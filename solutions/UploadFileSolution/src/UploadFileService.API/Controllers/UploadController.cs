using MediatR;
using Microsoft.AspNetCore.Mvc;
using UploadFileService.Application.CloudinaryFiles.Commands;
using UploadFileService.Application.CloudinaryFiles.Queries;
using UploadFileService.Domain.DTOs;

namespace UploadFileService.API.Controllers;


[Route("api/upload")]
[ApiController]
public class UploadController : ControllerBase
{
    private readonly ISender _sender;

    public UploadController(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _sender.Send(new GetAllCloudinaryFilesQuery());
        return Ok(result);
    }

    [HttpGet("id")]
    public async Task<IActionResult> Get([FromQuery] GetCloudinaryFileByIdDTO getCloudinaryFileByIdDTO)
    {
        if(getCloudinaryFileByIdDTO.Id != null)
        {
            var result = await _sender.Send(new GetCloudinaryFileByIdQuery 
            { 
                Id  = getCloudinaryFileByIdDTO.Id
            });
            return Ok(result);
        }
        return BadRequest("Get file fail");
    }

    [HttpPost("image")]
    public async Task<IActionResult> UploadImage([FromForm] UploadFileDTO uploadFileDTO)
    {
        var cloudinaryFile = await _sender.Send(new CreateCloudinaryImageFileCommand
        {
            FormFile = uploadFileDTO.File
        });
        if (cloudinaryFile == null)
        {
            return BadRequest(cloudinaryFile);
        }
        return Ok(cloudinaryFile);
    }

    [HttpPost("video")]
    public async Task<IActionResult> UploadVideo([FromForm] UploadFileDTO uploadFileDTO)
    {
        var cloudinaryFile = await _sender.Send(new CreateCloudinaryVideoFileCommand
        {
            FormFile = uploadFileDTO.File
        });
        if (cloudinaryFile == null)
        {
            return BadRequest(cloudinaryFile);
        }
        return Ok(cloudinaryFile);
    }

    [HttpPost("raw")]
    public async Task<IActionResult> UploadRaw([FromForm] UploadFileDTO uploadFileDTO)
    {
        var cloudinaryFile = await _sender.Send(new CreateCloudinaryRawFileCommand
        {
            FormFile = uploadFileDTO.File
        });
        if (cloudinaryFile == null)
        {
            return BadRequest(cloudinaryFile);
        }
        return Ok(cloudinaryFile);
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromQuery] DeleteCloudinaryFileByIdDTO deleteCloudinaryFileById)
    {
        if(deleteCloudinaryFileById.Id != null) {
        
            var deleteMessage = await _sender.Send(new DeleteCloudinaryFileCommand
            {
                Id = deleteCloudinaryFileById.Id
            });
            return Ok(deleteMessage);
        }
        return BadRequest("Delete fail");
    }
}
