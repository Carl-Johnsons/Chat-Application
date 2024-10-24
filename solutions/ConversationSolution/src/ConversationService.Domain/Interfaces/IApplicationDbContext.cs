
namespace ConversationService.Domain.Interfaces;


public interface IApplicationDbContext : IDbContext
{
    DbSet<Conversation> Conversations { get; set; }
    DbSet<GroupConversation> GroupConversation { get; set; }
    DbSet<ConversationUser> ConversationUsers { get; set; }
    DbSet<GroupConversationInvite> GroupConversationInvites { get; set; }
    DbSet<Message> Messages { get; set; }
    DbSet<DisabledNotification> DisabledNotifications { get; set; }
}
