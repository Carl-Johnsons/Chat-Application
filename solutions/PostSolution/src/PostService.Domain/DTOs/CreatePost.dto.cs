using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace PostService.Domain.DTOs;

public class CreatePostDTO
{
    [Required]
    [JsonProperty("content")]
    public string Content { get; set; } = null!;

    [Required]
    [JsonProperty("userId")]
    public Guid UserId { get; set; }

    [JsonProperty("tagIds")]
    public List<Guid> TagIds { get; set; } = null!;
}
