using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;

public class FileResponseDTO
{
    public List<FileDTO> AttachedFileDTOs { get; set; } = null!;
}

public class FileDTO
{
    [Required]
    [MaxLength(200)]
    [JsonProperty("name")]
    public string Name { get; set; } = null!;

    [Required]
    [JsonProperty("extensionTypeCode")]
    public string ExtensionTypeCode { get; set; } = null!;
    [Required]
    [JsonProperty("fileType")]
    public string FileType { get; set; } = null!;

    [Required]
    [JsonProperty("size")]
    public long Size { get; set; }

    [Required]
    [JsonProperty("url")]
    public string Url { get; set; } = null!;
}
