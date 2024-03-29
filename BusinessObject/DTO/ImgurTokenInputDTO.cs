
using System.Text.Json.Serialization;

namespace BussinessObject.DTO
{
    public class ImgurTokenInputDTO
    {
        [JsonPropertyName("refresh_token")]
        public string RefreshToken { get; set; } = null!;
        [JsonPropertyName("client_id")]
        public string ClientId { get; set; } = null!;
        [JsonPropertyName("client_secret")]
        public string ClientSecret { get; set; } = null!;
        [JsonPropertyName("grant_type")]
        public string GrantType { get; set; } = null!;
    }
}
