using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ChatHub.DTOs;

public class DisableAndEnableUserDTO
{
    [JsonProperty("id")]
    [Required]
    public Guid Id { get; set; }
}
