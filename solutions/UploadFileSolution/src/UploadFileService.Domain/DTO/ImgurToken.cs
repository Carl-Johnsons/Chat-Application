
using Newtonsoft.Json;

namespace UploadFileService.Domain.DTO;
public class ImgurToken
{
    [JsonProperty("access_token")]
    public string AccessToken { get; set; } = null!;
    [JsonProperty("expires_in")]
    public int ExpiresIn { get; set; }
    [JsonProperty("token_type")]
    public string TokenType { get; set; } = null!;
    [JsonProperty("scope")]
    public string Scope { get; set; } = null!;
    [JsonProperty("refresh_token")]
    public string RefreshToken { get; set; } = null!;
    [JsonProperty("account_id")]
    public int AccountId { get; set; }
    [JsonProperty("account_username")]
    public string AccountUsername { get; set; } = null!;
}
