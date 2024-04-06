using ConversationService.API.Repositories;
using ConversationService.Core.Constants;
using ConversationService.Core.DTOs;
using ConversationService.Core.Entities;
using ConversationService.Infrastructure;

namespace ConversationService.API.DAOs;

public class ConversationDAO
{
    private static ConversationDAO? instance = null;
    private static readonly object instanceLock = new object();

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
        return _context.Conversations.ToList();
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
    public Conversation AddConversationWithMemberId(Conversation conversationWithMembersId)
    {
        var _conversationUsersRepository = new ConversationUsersRepository();
        Add(conversationWithMembersId);
        var leaderId = conversationWithMembersId.Type == ConversationType.GROUP
                    ? (conversationWithMembersId as GroupConversationWithMembersId)?.LeaderId
                    : (conversationWithMembersId as ConversationWithMembersId)?.LeaderId;
        var membersId = conversationWithMembersId.Type == ConversationType.GROUP
                    ? (conversationWithMembersId as GroupConversationWithMembersId)?.MembersId
                    : (conversationWithMembersId as ConversationWithMembersId)?.MembersId;
        if (leaderId != null)
        {
            _conversationUsersRepository.Add(new ConversationUser()
            {
                ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                UserId = (int)leaderId,
                Role = "Leader",
            });
        }
        if (membersId != null)
        {
            foreach (var memberId in membersId)
            {
                if (memberId == leaderId)
                {
                    continue;
                }
                _conversationUsersRepository.Add(new ConversationUser()
                {
                    ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                    UserId = memberId,
                    Role = "Member",
                });
            }
        }
        return conversationWithMembersId;
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
