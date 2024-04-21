using Microsoft.EntityFrameworkCore;

namespace ConversationService.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext()
    {
    }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
    {
    }
    public virtual DbSet<Conversation> Conversations { get; set; }
    public virtual DbSet<GroupConversation> GroupConversation { get; set; }
    public virtual DbSet<ConversationUser> ConversationUsers { get; set; }
    public virtual DbSet<Friend> Friends { get; set; }
    public virtual DbSet<FriendRequest> FriendRequests { get; set; }
    public virtual DbSet<Message> Messages { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasDiscriminator(e => e.Type)
                  .HasValue<Conversation>("Individual")
                  .HasValue<GroupConversation>("Group");
        });
        modelBuilder.Entity<ConversationUser>(entity =>
        {
            entity.HasOne(d => d.Conversation).WithMany()
                .HasForeignKey(d => d.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(e => e.ReadTime)
                .HasConversion(v => v,
                               v => v.HasValue ? DateTime.SpecifyKind((DateTime)v, DateTimeKind.Utc) : null);
        });

        modelBuilder.Entity<Friend>(entity => { });

        modelBuilder.Entity<FriendRequest>(entity =>
        {
            entity.Property(e => e.Date)
                  .HasConversion(v => v,
                   v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.Property(e => e.Time)
                  .HasConversion(v => v,
                   v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });
    }
}
