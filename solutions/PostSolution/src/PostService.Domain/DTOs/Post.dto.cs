﻿using Newtonsoft.Json;
using PostService.Domain.Entities;

namespace PostService.Domain.DTOs;

public class PostDTO
{
    [JsonProperty("postId")]
    public Guid PostId { get; set; }

    [JsonProperty("content")]
    public string Content { get; set; } = null!;

    [JsonProperty("userId")]
    public Guid UserId { get; set; }

    [JsonProperty("interactionTotal")]
    public int InteractTotal { get; set; }

    [JsonProperty("interactions")]
    public List<string> Interactions { get; set; } = null!;

    [JsonProperty("createdAt")]
    public DateTime CreatedAt { get; set; }

    [JsonProperty("tags")]
    public List<string> Tags { get; set; } = null!;
}
