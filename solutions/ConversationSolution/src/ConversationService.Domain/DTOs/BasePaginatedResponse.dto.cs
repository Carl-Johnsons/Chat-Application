﻿using Newtonsoft.Json;

namespace ConversationService.Domain.DTOs;

public class BasePaginatedResponse<Type, MetadataType>
    where Type : class
    where MetadataType : class
{
    [JsonProperty("paginatedData")]
    public IEnumerable<Type> PaginatedData { get; set; } = [];

    [JsonProperty("metadata")]
    public MetadataType? Metadata { get; set; } = null!;
}

public class PaginatedMessageListResponseDTO : BasePaginatedResponse<Message, MessageListMetadata>;

