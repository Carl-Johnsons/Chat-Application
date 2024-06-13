﻿using Newtonsoft.Json;

namespace PostService.Domain.DTOs;

public class PostReportListDTO
{
    [JsonProperty("postId")]
    public Guid PostId { get; set; }

    [JsonProperty("count")]
    public int PostCount { get; set; }
}
