using Newtonsoft.Json;

namespace DuendeIdentityServer.DTOs;

public class BlockUserListDTO
{
    [JsonProperty("blockUserId")]
    public List<string> BlockUserId { get; set; } = null!;
}
