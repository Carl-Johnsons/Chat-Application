using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class UpdateGroupConversationDTO
{
    [Required]
    [JsonProperty("id")]
    public Guid Id { get; set; }
    [JsonProperty("membersId")]
    public List<Guid>? MembersId { get; set; } = null!;
    [JsonProperty("name")]
    public string? Name { get; set; } = null!;
    [JsonProperty("imageFile")]
    public IFormFile? ImageFile { get; set; } = null!;
}
