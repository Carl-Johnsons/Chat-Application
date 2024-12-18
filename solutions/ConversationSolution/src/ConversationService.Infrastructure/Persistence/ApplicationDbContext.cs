﻿namespace ConversationService.Infrastructure.Persistence;

public class ApplicationDbContext : DbContext, IApplicationDbContext
{
    public ApplicationDbContext()
    {
    }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
    {
    }

    public DbContext Instance => this;
    public virtual DbSet<Conversation> Conversations { get; set; }
    public virtual DbSet<GroupConversation> GroupConversation { get; set; }
    public virtual DbSet<GroupConversationInvite> GroupConversationInvites { get; set; }
    public virtual DbSet<ConversationUser> ConversationUsers { get; set; }
    public virtual DbSet<Message> Messages { get; set; }
    public virtual DbSet<DisabledNotification> DisabledNotifications { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        DotNetEnv.Env.Load(".env");

        var server = DotNetEnv.Env.GetString("DB_SERVER") ?? "localhost, 2001";
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD") ?? "NOT FOUND";

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true;MultipleActiveResultSets=True";
        
        Console.WriteLine(connectionString);
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasDiscriminator(e => e.Type)
                  .HasValue<Conversation>(CONVERSATION_TYPE_CODE.INDIVIDUAL)
                  .HasValue<GroupConversation>(CONVERSATION_TYPE_CODE.GROUP);
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        });

        modelBuilder.Entity<GroupConversationInvite>(entity =>
        {
            entity.HasOne(e => e.GroupConversation)
                  .WithMany()
                  .HasForeignKey(e => e.GroupConversationId)
                  .OnDelete(DeleteBehavior.Cascade);
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.ExpiresAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

        });

        modelBuilder.Entity<ConversationUser>(entity =>
        {
            entity.HasOne(cu => cu.Conversation)
                .WithMany(c => c.Users)
                .HasForeignKey(cu => cu.ConversationId)
                .OnDelete(DeleteBehavior.Cascade);

            entity.Property(cu => cu.ReadTime)
                .HasConversion(v => v,
                               v => v.HasValue ? DateTime.SpecifyKind((DateTime)v, DateTimeKind.Utc) : null);
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

    }
}
