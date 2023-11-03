using BussinessObject.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChatAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        // GET: api/<ToolsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ToolsController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<ToolsController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpPost("UploadImageImgur")]
        public async Task<string> UploadAvatar(IFormFile ImageFile)
        {
            try
            {
                Console.WriteLine(ImageFile);
                if (ImageFile != null && ImageFile.Length > 0)
                {
                    using (var httpClient = new HttpClient())
                    {
                        using (var form = new MultipartFormDataContent())
                        {
                            using (var stream = new MemoryStream())
                            {
                                await ImageFile.CopyToAsync(stream);
                                byte[] fileBytes = stream.ToArray();
                                form.Add(new ByteArrayContent(fileBytes, 0, fileBytes.Length), "image", "image.png");

                                httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Client-ID", "87da474f87f4754");
                                var img_response = await httpClient.PostAsync("https://api.imgur.com/3/upload", form);
                                var responseContent = await img_response.Content.ReadAsStringAsync();
                                var responseObject = JObject.Parse(responseContent);
                                // Get the URL of the uploaded image
                                string imageId = responseObject["data"]["id"].Value<string>();
                                string imageUrl = $"https://i.imgur.com/{imageId}.jpeg";
                                return imageUrl;
                            }
                        }
                    }
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return "img/user.png";

        }

        // PUT api/<ToolsController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ToolsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
