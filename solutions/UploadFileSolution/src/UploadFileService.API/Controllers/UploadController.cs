using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace UploadFileService.API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UploadController : ControllerBase
{
    [HttpPost("Image")]
    public async Task<IActionResult> UploadImage(IFormFile ImageFile)
    {
        try
        {
            if (ImageFile == null || ImageFile.Length == 0)
            {
                return BadRequest("File object is null");
            }
            string? accessToken = Environment.GetEnvironmentVariable("Imgur__AccessToken");

            using var httpClient = new HttpClient();
            using var form = new MultipartFormDataContent();
            using var stream = new MemoryStream();

            await ImageFile.CopyToAsync(stream);
            byte[] fileBytes = stream.ToArray();
            form.Add(new ByteArrayContent(fileBytes, 0, fileBytes.Length), "image", "image.png");

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            var img_response = await httpClient.PostAsync("https://api.imgur.com/3/upload", form);
            img_response.EnsureSuccessStatusCode();
            var responseContent = await img_response.Content.ReadAsStringAsync();

            return Content(responseContent, "application/json");
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}
