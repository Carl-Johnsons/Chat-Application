﻿namespace ConversationService.Infrastructure.Persistence.Repositories;

internal sealed class ConversationUsersRepository : BaseRepository<ConversationUser>, IConversationUsersRepository
{
    public ConversationUsersRepository(ApplicationDbContext context) : base(context)
    {
    }
    public Task<ConversationUser?> GetAsync(int conversationId, int userId)
    {
        return _context.ConversationUsers
                         .SingleOrDefaultAsync(cu => cu.ConversationId == conversationId && cu.UserId == userId);
    }
    public Task<List<ConversationUser>> GetByConversationIdAsync(int conversationId)
    {
        return _context.ConversationUsers.Where(cu => cu.ConversationId == conversationId).ToListAsync();
    }
    public List<ConversationUser> GetByUserId(int userId)
    {
        var conversationUsers = _context.ConversationUsers
                        .Where(cu => cu.UserId == userId)
                        .ToList();
        var groupConversationIds = conversationUsers
                        .Where(cu => cu.Conversation.Type == ConversationType.GROUP)
                        .Select(cu => cu.ConversationId)
                        .ToList();
        var groupConversation = _context.GroupConversation
                                .Where(gc => groupConversationIds.Contains(gc.Id))
                                .ToList();
        foreach (var cu in conversationUsers)
        {
            if (cu.Conversation == null)
            {
                continue;
            }
            if (cu.Conversation.Type == ConversationType.GROUP)
            {
                cu.Conversation = groupConversation.FirstOrDefault(gc => gc.Id == cu.ConversationId, cu.Conversation);
            }
        }

        return conversationUsers;
    }
    // This query seem unoptimized
    public ConversationUser? GetIndividualConversation(int userId, int user2Id)
    {
        var user1Conversations = GetByUserId(userId);
        var user2Conversations = GetByUserId(user2Id);

        foreach (var user2Conversation in user2Conversations)
        {
            var cu = user1Conversations.SingleOrDefault(c => c.ConversationId == user2Conversation.ConversationId, null);
            if (cu != null)
            {
                return cu;
            }
        }
        return null;

    }
}