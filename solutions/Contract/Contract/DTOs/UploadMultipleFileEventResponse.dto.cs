using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Contract.DTOs;

public class UploadMultipleFileEventResponseDTO
{
    [Required]
    [JsonProperty("files")]
    public IEnumerable<UploadFileEventResponseDTO> Files { get; set; } = null!;
}