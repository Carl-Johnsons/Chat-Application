using ConversationService.Core.Constants;
using ConversationService.Core.Entities;

namespace ConversationService.Infrastructure.DAO;

public class ConversationUserDAO
{
    private static ConversationUserDAO? instance = null;
    private static readonly object instanceLock = new ();

    private ConversationUserDAO() { }

    public static ConversationUserDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new ConversationUserDAO();
                return instance;
            }
        }
    }
    public List<ConversationUser> Get()
    {
        using var _context = new ApplicationDbContext();
        return [.. _context.ConversationUsers];
    }
    public ConversationUser? Get(int conversationId, int userId)
    {
        using var _context = new ApplicationDbContext();
        return _context.ConversationUsers
                       .SingleOrDefault(cu => cu.ConversationId == conversationId && cu.UserId == userId);
    }
    public List<ConversationUser> GetByConversationId(int conversationId)
    {
        using var _context = new ApplicationDbContext();
        return [.. _context.ConversationUsers.Where(cu => cu.ConversationId == conversationId)];
    }
    public List<ConversationUser> GetByUserId(int userId)
    {
        using var _context = new ApplicationDbContext();
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
    public void Add(ConversationUser conversationUser)
    {
        using var _context = new ApplicationDbContext();
        _context.ConversationUsers.Add(conversationUser);
        _context.SaveChanges();
    }
    public void Delete(int conversationId, int userId)
    {
        using var _context = new ApplicationDbContext();
        var conversationUser = Get(conversationId, userId);
        if (conversationUser != null)
        {
            _context.ConversationUsers.Remove(conversationUser);
            _context.SaveChanges();
        };
    }
}
