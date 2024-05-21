using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs;

public class BlockUserDTO
{
    [Required]
    [JsonProperty("blockUserId")]
    public string BlockUserId { get; set; } = null!;
}
