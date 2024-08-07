﻿using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Domain.DTOs;
public class CreateGroupConversationDTO
{
    [Required]
    [JsonProperty("membersId")]
    public List<Guid> MembersId { get; set; } = null!;

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public IFormFile? ImageFile { get; set; } = null!;
}