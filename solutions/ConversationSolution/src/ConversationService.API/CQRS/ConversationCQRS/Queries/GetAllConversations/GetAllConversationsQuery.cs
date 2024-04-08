
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Queries.GetAllConversations;

public class GetAllConversationsQuery : IRequest<List<Conversation>>
{
    public GetAllConversationsQuery()
    {
    }
}
