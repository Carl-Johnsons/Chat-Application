using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.Net.Http.Headers;

namespace WebChatApplication.Libs
{
    public class Tool
    {

        public static async Task<string> UploadImageToImgur(IFormFile ImageFile)
        {
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

            return "img/user.png";
        }

        
    }
}

