

using Newtonsoft.Json;

namespace BussinessObject.DTO
{
    public class ImgurTokenInputDTO
    {
        [JsonProperty("refresh_token")]
        public string RefreshToken { get; set; } = null!;
        [JsonProperty("client_id")]
        public string ClientId { get; set; } = null!;
        [JsonProperty("client_secret")]
        public string ClientSecret { get; set; } = null!;
        [JsonProperty("grant_type")]
        public string GrantType { get; set; } = null!;
    }
}
