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
    public virtual DbSet<Message> Messages { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        DotNetEnv.Env.Load();
        var server = DotNetEnv.Env.GetString("SERVER", "Not found");
        var db = DotNetEnv.Env.GetString("DB", "Not found");
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found");

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true";
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Conversation>(entity =>
        {
            entity.HasDiscriminator(e => e.Type)
                  .HasValue<Conversation>(CONVERSATION_TYPE_CODE.INDIVIDUAL)
                  .HasValue<GroupConversation>(CONVERSATION_TYPE_CODE.GROUP);
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

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
        });

    }
}
