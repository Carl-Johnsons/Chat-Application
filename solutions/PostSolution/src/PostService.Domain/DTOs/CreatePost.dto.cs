using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PostService.Domain.DTOs;

public class CreatePostDTO
{
    [Required]
    [JsonProperty("content")]
    public string content { get; set; } = null!;

    [Required]
    [JsonProperty("userId")]
    public Guid userId { get; set; }
}
