using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {

        [HttpPost("UploadImageImgur")]
        public async Task<IActionResult> UploadAvatar(IFormFile ImageFile)
        {
            var config = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
            var imgurSection = config.GetSection("Imgur");
            var clientId = imgurSection["ClientID"];
            var clientSecret = imgurSection["ClientSecret"];
            try
            {
                if (ImageFile == null || ImageFile.Length == 0)
                {
                    return BadRequest("File object is null");
                }
                using var httpClient = new HttpClient();
                using var form = new MultipartFormDataContent();
                using var stream = new MemoryStream();

                await ImageFile.CopyToAsync(stream);
                byte[] fileBytes = stream.ToArray();
                form.Add(new ByteArrayContent(fileBytes, 0, fileBytes.Length), "image", "image.png");

                //Authorization: Client-ID YOUR_CLIENT_ID
                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Client-ID", clientId);
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
}
