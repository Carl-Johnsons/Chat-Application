
using ConversationService.Core.Entities;
using ConversationService.Infrastructure.DAO;

namespace ConversationService.Infrastructure.Repositories;

public class ConversationRepository
{
    private readonly ConversationDAO Instance = ConversationDAO.Instance;

    public void Add(Conversation conversation) => Instance.Add(conversation);
    public void Delete(int conversationId) => Instance.Delete(conversationId);

    public List<Conversation> Get() => Instance.Get();

    public Conversation? Get(int id) => Instance.Get(id);

    public void Update(Conversation conversation) => Instance.Update(conversation);

}
