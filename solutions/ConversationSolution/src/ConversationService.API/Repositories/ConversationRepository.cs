
using ConversationService.API.DAOs;
using ConversationService.Core.DTOs;
using ConversationService.Core.Entities;

namespace ConversationService.API.Repositories;

public class ConversationRepository
{
    private readonly ConversationDAO Instance = ConversationDAO.Instance;

    public void Add(Conversation conversation) => Instance.Add(conversation);
    public Conversation AddConversationWithMemberId(Conversation conversationWithMembersId) => Instance.AddConversationWithMemberId(conversationWithMembersId);
    
    public void Delete(int conversationId) => Instance.Delete(conversationId);

    public List<Conversation> Get() => Instance.Get();

    public Conversation? Get(int id) => Instance.Get(id);

    public void Update(Conversation conversation) => Instance.Update(conversation);
}
