using Microsoft.EntityFrameworkCore;

namespace BussinessObject.Models;

public partial class ChatApplicationContext : DbContext
{
    public ChatApplicationContext()
    {
    }

    public ChatApplicationContext(DbContextOptions<ChatApplicationContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Conversation> Conversation { get; set; }
    public virtual DbSet<ConversationUser> ConversationUsers { get; set; }
    public virtual DbSet<Friend> Friends { get; set; }
    public virtual DbSet<FriendRequest> FriendRequests { get; set; }
    public virtual DbSet<GroupConversation> GroupConversation { get; set; }
    public virtual DbSet<Message> Messages { get; set; }
    public virtual DbSet<User> Users { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //var MyConfig = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
        //var defaultConnectionString = MyConfig.GetConnectionString("Default");
        var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
        Console.WriteLine(connectionString);
        optionsBuilder.UseSqlServer(connectionString);
    }

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
            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__ConversationUser__User");

            entity.HasOne(d => d.Conversation).WithMany()
                .HasForeignKey(d => d.ConversationId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK__ConversationUser__Conversation");
            entity.Property(e => e.ReadTime)
                .HasConversion(v => v,
                               v => v.HasValue ? DateTime.SpecifyKind((DateTime)v, DateTimeKind.Utc) : null);
        });

        modelBuilder.Entity<Friend>(entity =>
        {
            entity.HasOne(d => d.FriendNavigation).WithMany()
                .HasForeignKey(d => d.FriendId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Friend__Friend_I__276EDEB3");

            entity.HasOne(d => d.User).WithMany()
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Friend__User_ID__267ABA7A");


        });

        modelBuilder.Entity<FriendRequest>(entity =>
        {
            entity.HasOne(d => d.Receiver).WithMany()
                .HasForeignKey(d => d.ReceiverId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Recei__2A4B4B5E");

            entity.HasOne(d => d.Sender).WithMany()
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__FriendReq__Sende__29572725");
            entity.Property(e => e.Date)
                  .HasConversion(v => v,
                   v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<Message>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.HasOne(d => d.Sender).WithMany()
                .HasForeignKey(d => d.SenderId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Message__Sender___37A5467C");

            entity.Property(e => e.Time)
                  .HasConversion(v => v,
                   v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
