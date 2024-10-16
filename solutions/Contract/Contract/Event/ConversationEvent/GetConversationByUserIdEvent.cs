﻿using Contract.DTOs;
using MassTransit;

namespace Contract.Event.ConversationEvent;

[EntityName("get-conversation-by-user-id-event")]
public record GetConversationByUserIdEvent
{
    public Guid UserId { get; set; }
}

public class ConversationEventResponse
{
    public List<ConversationEventResponseDTO> Conversations { get; set; } = null!;
}