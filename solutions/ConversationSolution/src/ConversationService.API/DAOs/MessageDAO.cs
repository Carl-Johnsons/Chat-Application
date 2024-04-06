using ConversationService.Core.Constants;
using ConversationService.Core.Entities;
using ConversationService.Infrastructure;

namespace ConversationService.API.DAOs;

public class MessageDAO
{
    //using singleton to access db by one instance variable
    private static MessageDAO? instance = null;
    private static readonly object instanceLock = new();
    private MessageDAO() { }
    public static MessageDAO Instance
    {
        get
        {
            lock (instanceLock)
            {
                instance ??= new MessageDAO();
                return instance;
            }
        }
    }
    public List<Message> Get()
    {
        using var _context = new ApplicationDbContext();
        return _context.Messages.ToList(); ;
    }
    public Message? Get(int? messageId)
    {
        _ = messageId ?? throw new Exception("Message id is null");
        using var _context = new ApplicationDbContext();
        return _context.Messages.SingleOrDefault(m => m.Id == messageId); ;
    }
    public List<Message> Get(int? conversationId, int skip)
    {
        _ = conversationId ?? throw new Exception("Conversation id is null");
        using var _context = new ApplicationDbContext();
        var messages = _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Skip(skip * MessageConstant.LIMIT)
            .Take(MessageConstant.LIMIT)
            .OrderBy(m => m.Id)
            .ToList();
        return messages;
    }
    public Message? GetLast(int? conversationId)
    {
        _ = conversationId ?? throw new Exception("Conversation id is null");
        using var _context = new ApplicationDbContext();
        var message = _context.Messages
            .Where(m => m.ConversationId == conversationId)
            .OrderByDescending(m => m.Id)
            .Take(1)
            .SingleOrDefault();
        return message;
    }

    public int Add(Message message)
    {
        _ = message ?? throw new Exception("Message is null! Abort adding message operation");
        using var _context = new ApplicationDbContext();
        _context.Messages.Add(message);
        return _context.SaveChanges();
    }
    public int Update(Message updateMessage)
    {
        _ = updateMessage ?? throw new Exception("Update message is null! Abort updating message operation");
        var oldMessage = Get(updateMessage.Id) ?? throw new Exception("Message not found! Abort updating message operation");
        using var _context = new ApplicationDbContext();
        _context.Entry(oldMessage).CurrentValues.SetValues(updateMessage);
        return _context.SaveChanges();
    }

    public int Delete(int? messageId)
    {
        _ = messageId ?? throw new Exception("Update message is null! Abort updating message operation");
        var message = Get(messageId) ?? throw new Exception("Message not found! Abort updating message operation");
        using var _context = new ApplicationDbContext();
        _context.Messages.Remove(message);
        return _context.SaveChanges();
    }
}
