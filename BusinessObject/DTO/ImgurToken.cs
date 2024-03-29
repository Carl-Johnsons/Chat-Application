
using System.Text.Json.Serialization;

namespace BussinessObject.DTO
{
    public class ImgurToken
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; } = null!;
        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
        [JsonPropertyName("token_type")]
        public string TokenType { get; set; } = null!;
        [JsonPropertyName("scope")]
        public string Scope { get; set; } = null!;
        [JsonPropertyName("refresh_token")]
        public string RefreshToken { get; set; } = null!;
        [JsonPropertyName("account_id")]
        public int AccountId { get; set; }
        [JsonPropertyName("account_username")]
        public string AccountUsername { get; set; } = null!;
    }
}
