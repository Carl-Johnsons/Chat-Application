using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Queries;

public record GetConversationListByUserIdQuery : IRequest<ConversationsResponseDTO>
{
    public Guid UserId { get; init; }
};

public class GetConversationListByUserIdQueryHandler : IRequestHandler<GetConversationListByUserIdQuery, ConversationsResponseDTO>
{
    private readonly IApplicationDbContext _context;

    public GetConversationListByUserIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<ConversationsResponseDTO> Handle(GetConversationListByUserIdQuery request, CancellationToken cancellationToken)
    {
        var conversations = await _context.Conversations
            .Include(c => c.Users)
            .Where(c => c.Users.Any(u => u.UserId == request.UserId))
            .ToListAsync(cancellationToken);



        var conversationList = conversations
            .Where(c => c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL)
            .Select(c =>
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

                return new ConversationResponseDTO
                {
                    Id = c.Id,
                    CreatedAt = c.CreatedAt,
                    UpdatedAt = c.UpdatedAt,
                    Type = c.Type,
                    Users = usersWithoutCurrentUser
                };
            })
            .ToList();


        var groupConversationList = conversations
            .Where(c => c.Type == CONVERSATION_TYPE_CODE.GROUP)
            .Select(c =>
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

                var gc = c as GroupConversation;
                return new GroupConversationResponseDTO
                {
                    Id = gc.Id,
                    Name = gc.Name,
                    CreatedAt = gc.CreatedAt,
                    UpdatedAt = gc.UpdatedAt,
                    Type = gc.Type,
                    ImageURL = gc.ImageURL,
                    InviteURL = gc.InviteURL,
                    Users = usersWithoutCurrentUser
                };
            })
            .ToList();

        return new ConversationsResponseDTO
        {
            Conversations = conversationList,
            GroupConversations = groupConversationList
        };
    }

}
