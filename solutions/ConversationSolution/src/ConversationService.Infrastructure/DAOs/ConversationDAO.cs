using ConversationService.Core.Entities;

namespace ConversationService.Infrastructure.DAO;

public class ConversationDAO
{
    private static ConversationDAO? instance = null;
    private static readonly object instanceLock = new();

    private ConversationDAO() { }

    public static ConversationDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new ConversationDAO();
                return instance;
            }
        }
    }
    public List<Conversation> Get()
    {
        using var _context = new ApplicationDbContext();
        return [.. _context.Conversations];
    }
    public Conversation? Get(int id)
    {
        using var _context = new ApplicationDbContext();
        return _context.Conversations.SingleOrDefault(c => c.Id == id);
    }

    public void Add(Conversation conversation)
    {
        try
        {
            using var _context = new ApplicationDbContext();
            _context.Conversations.Add(conversation);
            _context.SaveChanges();
        }
        catch (Exception ex)
        {
            throw new Exception(ex.Message);
        }
    }
    public void Update(Conversation conversation)
    {
        using var _context = new ApplicationDbContext();
        var oldConversation = Get(conversation.Id);
        if (oldConversation != null)
        {
            _context.Conversations.Update(conversation);
            _context.SaveChanges();
        };
    }
    public void Delete(int conversationId)
    {
        using var _context = new ApplicationDbContext();
        var conversation = Get(conversationId);
        if (conversation != null)
        {
            _context.Conversations.Remove(conversation);
            _context.SaveChanges();
        };
    }
}
