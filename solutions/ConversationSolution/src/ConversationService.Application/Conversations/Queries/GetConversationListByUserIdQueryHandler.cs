using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetConversationListByUserIdQuery : IRequest<Result<ConversationsResponseDTO>>
{
    public Guid UserId { get; init; }
};

public class GetConversationListByUserIdQueryHandler : IRequestHandler<GetConversationListByUserIdQuery, Result<ConversationsResponseDTO>>
{
    private readonly IApplicationDbContext _context;

    public GetConversationListByUserIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Result<ConversationsResponseDTO>> Handle(GetConversationListByUserIdQuery request, CancellationToken cancellationToken)
    {
        var conversations = await _context.Conversations
            .Include(c => c.Users)
            .Where(c => c.Users.Any(u => u.UserId == request.UserId))
            .ToListAsync(cancellationToken);

        var lastMessages = await _context.Messages
            .Where(m => conversations.Select(c => c.Id).Contains(m.ConversationId))
            .GroupBy(m => m.ConversationId)
            .Select(g => g.OrderByDescending(m => m.CreatedAt).FirstOrDefault())
            .ToListAsync(cancellationToken);

        // Create a dictionary of last messages for fast lookup
        var lastMessagesDict = lastMessages.ToDictionary(m => m.ConversationId, m => m);

        // Process conversations and include last messages
        var conversationList = conversations.Select(c =>
        {
            var usersWithoutCurrentUser = c.Users
                .Where(u => u.UserId != request.UserId)
                .Select(u => new ConversationUserResponseDTO
                {
                    UserId = u.UserId,
                    Role = u.Role,
                    ReadTime = u.ReadTime,
                })
                .ToList();

            lastMessagesDict.TryGetValue(c.Id, out var lastMessage);

            return new GroupConversationResponseDTO
            {
                Id = c.Id,
                CreatedAt = c.CreatedAt,
                UpdatedAt = c.UpdatedAt,
                Type = c.Type,
                Name = c.Type == CONVERSATION_TYPE_CODE.GROUP ? (c as GroupConversation)!.Name : "",
                ImageURL = c.Type == CONVERSATION_TYPE_CODE.GROUP ? (c as GroupConversation)!.ImageURL : "",
                Users = usersWithoutCurrentUser,
                LastMessage = lastMessage!
            };
        }).ToList();

        var sortedConversations = conversationList
            .OrderByDescending(c => c.LastMessage?.CreatedAt ?? c.CreatedAt)
            .ToList();

        var dto = new ConversationsResponseDTO
        {
            Conversations = sortedConversations,
        };

        return Result<ConversationsResponseDTO>.Success(dto);
    }
}
