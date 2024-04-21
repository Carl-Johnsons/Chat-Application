﻿namespace ConversationService.Application.Conversations.Queries.GetConversation;

public class GetConversationQueryHandlercs : IRequestHandler<GetConversationQuery, Conversation?>
{
    private readonly IConversationRepository _conversationRepository;

    public GetConversationQueryHandlercs(IConversationRepository conversationRepository)
    {
        _conversationRepository = conversationRepository;
    }

    public Task<Conversation?> Handle(GetConversationQuery request, CancellationToken cancellationToken)
    {
        return _conversationRepository.GetByIdAsync(request.ConversationId);
    }
}
