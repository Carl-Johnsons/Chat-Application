using ConversationService.Infrastructure.Persistence.Mockup.Data;

namespace ConversationService.Infrastructure.Persistence.Mockup;

internal class MockupData
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public MockupData(ApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task SeedConversationData()
    {
        if (_context.Conversations.Any())
        {
            return;
        }

        await Console.Out.WriteLineAsync("=================Begin seeding conversation data=================");
        foreach (var friend in FriendData.Data)
        {
            var userId = Guid.Parse(friend.UserId);
            var otherUserId = Guid.Parse(friend.FriendId);
            var isConversationExisted = _context.Conversations
                                                .Include(c => c.Users)
                                                .Where(c => c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL &&
                                                            c.Users.Where(u => u.UserId == userId)
                                                                   .SingleOrDefault() != null &&
                                                            c.Users.Where(u => u.UserId == otherUserId)
                                                                   .SingleOrDefault() != null)
                                                .SingleOrDefault() != null;
            if (isConversationExisted)
            {
                await Console.Out.WriteLineAsync($"Individual Conversation with {userId}, {otherUserId} is already existed");
                continue;
            }

            var conversation = new Conversation
            {
                Type = CONVERSATION_TYPE_CODE.INDIVIDUAL
            };

            _context.Conversations.Add(conversation);

            ConversationUser cu = new()
            {
                ConversationId = conversation.Id,
                UserId = userId,
                Role = "Member",
            };
            _context.ConversationUsers.Add(cu);

            ConversationUser cou = new()
            {
                ConversationId = conversation.Id,
                UserId = otherUserId,
                Role = "Member",
            };
            _context.ConversationUsers.Add(cou);
            await Console.Out.WriteLineAsync($"Added Individual Conversation with {userId}, {otherUserId}");

        }
        await _unitOfWork.SaveChangeAsync();
        await Console.Out.WriteLineAsync("=================DONE seeding conversation data=================");

    }
}
