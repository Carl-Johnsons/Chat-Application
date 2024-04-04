using Newtonsoft.Json;
using System.Text;
using UploadFileService.Core.DTO;

namespace UploadFileService.API.Middlewares
{
    // You may need to install the Microsoft.AspNetCore.Http.Abstractions package into your project
    public class ValidateImgurAccessToken
    {
        private readonly RequestDelegate _next;

        public ValidateImgurAccessToken(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            string? accessToken = Environment.GetEnvironmentVariable("Imgur__AccessToken");
            int accessTokenExpireIn;
            // Add validating access token later
            if (!int.TryParse(Environment.GetEnvironmentVariable("Imgur__AccessTokenExpiresIn"), out accessTokenExpireIn))
            {
                var imgurToken = await GetImgurToken();
                accessToken = imgurToken?.AccessToken;
                if (string.IsNullOrEmpty(accessToken))
                {
                    throw new Exception("access token is empty");
                }
            };
            await _next(context);
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

    // Extension method used to add the middleware to the HTTP request pipeline.
    public static class ValidateImgurAccessTokenExtensions
    {
        public static IApplicationBuilder UseValidateImgurAccessToken(this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<ValidateImgurAccessToken>();
        }
    }
}
