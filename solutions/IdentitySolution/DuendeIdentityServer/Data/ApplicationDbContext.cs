using DuendeIdentityServer.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DuendeIdentityServer.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
{
    public DbSet<Friend> Friends { get; set; }
    public DbSet<FriendRequest> FriendRequests { get; set; }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        // Customize the ASP.NET Identity model and override the defaults if needed.
        // For example, you can rename the ASP.NET Identity table names and more.
        // Add your customizations after calling base.OnModelCreating(builder);
        builder.Entity<ApplicationUser>(
                e =>
                {
                    e.Property(u => u.Introduction)
                        .HasDefaultValue(string.Empty);
                    e.Property(u => u.Active)
                        .HasDefaultValueSql("1");
                });

        builder.Entity<Friend>(
                   e =>
                   {
                       e.HasOne(f => f.User)
                        .WithMany(u => u.Friends)
                        .HasForeignKey(f => f.UserId)
                        .HasConstraintName("User_Friend")
                        .OnDelete(DeleteBehavior.Cascade);
                   });

        builder.Entity<FriendRequest>(
                   e =>
                   {
                       e.HasOne(fr => fr.Sender)
                        .WithMany()
                        .HasForeignKey(fr => fr.SenderId)
                        .HasConstraintName("Sender_FriendRequest")
                        .OnDelete(DeleteBehavior.Cascade);

                       e.HasOne(fr => fr.Receiver)
                        .WithMany()
                        .HasForeignKey(fr => fr.ReceiverId)
                        .HasConstraintName("Receiver_FriendRequest")
                        .OnDelete(DeleteBehavior.Restrict);
                   });
    }
}
