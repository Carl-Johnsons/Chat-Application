using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PostService.Domain.DTOs;

public class CreatePostDTO
{
    [Required]
    [JsonProperty("content")]
    public string Content { get; set; } = null!;

    [JsonProperty("tagIds")]
    public List<Guid> TagIds { get; set; } = null!;
}
