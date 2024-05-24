﻿using Contract.Common;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Contract.DTOs;

public class ConversationResponseDTO : BaseAuditableEntity
{
    [Required]
    [JsonProperty("type")]
    public string Type { get; set; } = null!;
}