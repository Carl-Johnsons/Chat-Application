using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace DuendeIdentityServer.DTOs
{
    public class UpdateUserDTO
    {
        [Required]
        [JsonProperty("sub")]
        public string Sub { get; set; } = null!;


        [JsonProperty("name")]
        public string? Name { get; set; }

        [JsonProperty("avatarUrl")]
        public string? AvatarUrl { get; set; }

        [JsonProperty("backgroundUrl")]
        public string? BackgroundUrl { get; set; }

        [JsonProperty("introduction")]
        public string? Introduction { get; set; }

        [JsonProperty("gender")]
        public string? Gender { get; set; }

        [JsonProperty("dob")]
        public DateTime? Dob { get; set; }

    }
}
