using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PostService.Domain.DTOs;

public class CreateInteractionDTO
{
    [Required]
    [JsonProperty("value")]
    public string Value { get; set; } = null!;
}
