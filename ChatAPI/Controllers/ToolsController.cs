using BussinessObject.DTO;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Sprache;
using System.Net.Http.Headers;
using System.Text;

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
            try
            {
                if (ImageFile == null || ImageFile.Length == 0)
                {
                    return BadRequest("File object is null");
                }
                string? accessToken = Environment.GetEnvironmentVariable("Imgur__AccessToken");
                int accessTokenExpireIn;
                // Add validating access token later
                if (!int.TryParse(Environment.GetEnvironmentVariable("Imgur__AccessTokenExpiresIn"), out accessTokenExpireIn)) {
                    var imgurToken = await GetImgurToken();
                    accessToken = imgurToken?.AccessToken;
                    if (string.IsNullOrEmpty(accessToken)) {
                        throw new Exception("access token is empty");
                    }
                };


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

        private async Task<ImgurToken?> GetImgurToken()
        {
            try
            {
                using HttpClient httpClient = new HttpClient();
                var clientId = Environment.GetEnvironmentVariable("Imgur__ClientID");
                var clientSecret = Environment.GetEnvironmentVariable("Imgur__ClientSecret");
                var refreshToken = Environment.GetEnvironmentVariable("Imgur__RefreshToken");
                var grantType = "refresh_token";
                var bodyContent = new ImgurTokenInputDTO()
                {
                    ClientId = clientId ?? "",
                    ClientSecret = clientSecret ?? "",
                    RefreshToken = refreshToken ?? "",
                    GrantType = grantType
                };
                var json = JsonConvert.SerializeObject(bodyContent);
                var stringContent = new StringContent(json, Encoding.UTF8, "application/json");
                var tokenResponse = await httpClient.PostAsync("https://api.imgur.com/oauth2/token", stringContent);
                tokenResponse.EnsureSuccessStatusCode();
                var tokenResponseContent = await tokenResponse.Content.ReadAsStringAsync();
                var imgurToken = JsonConvert.DeserializeObject<ImgurToken>(tokenResponseContent);
                if (imgurToken != null)
                {
                    Environment.SetEnvironmentVariable("Imgur__AccessToken", imgurToken.AccessToken.ToString());
                    Environment.SetEnvironmentVariable("Imgur__AccessTokenExpiresIn", imgurToken.ExpiresIn.ToString());
                    return imgurToken;
                }
            }
            catch (Exception ex)
            {
                await Console.Out.WriteLineAsync("Fail to get imgur token: " + ex.Message);
            }
            return null;
        }
    }
}
