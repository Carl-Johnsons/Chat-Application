
using AuthService.Core.Entities;
using Microsoft.EntityFrameworkCore;

namespace AuthService.Infrastructure;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext() { }
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
    : base(options)
    {
    }
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Account> Accounts { get; set; }
    public virtual DbSet<Token> Tokens { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        var connectionString = Environment.GetEnvironmentVariable("ConnectionString");
        Console.WriteLine(connectionString);
        optionsBuilder.UseSqlServer(connectionString);

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Active).HasDefaultValue(true);
            entity.HasOne(e => e.Account)
                  .WithOne()
                  .HasForeignKey<Account>(e => e.UserId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .IsRequired();
        });
        modelBuilder.Entity<Account>(entity =>
        {
            entity.HasOne(e => e.Token)
                  .WithOne()
                  .HasForeignKey<Token>(e => e.AccountId)
                  .OnDelete(DeleteBehavior.Cascade)
                  .IsRequired();
        });
        modelBuilder.Entity<User>().HasData(
    new User
    {
        Id = 1,
        Name = "Test",
        Gender = "Male",
        Active = true,
        DOB = new DateTime(2005, 7, 23),
        AvatarUrl = "https://fastly.picsum.photos/id/402/200/200.jpg?hmac=9PZqzeq_aHvVAxvDPNfP6GuD58m4rilq-TUrG4e7V80",
        BackgroundUrl = "https://fastly.picsum.photos/id/476/500/300.jpg?hmac=SU_Gn-erKcK2Cx5i77j3LKWogOQdPC0f8vBYyqdvyjQ",
        Introduction = "Hello :)",
    }
);

        modelBuilder.Entity<Account>().HasData(
            new Account
            {
                Id = 1,
                UserId = 1,
                Email = "aaa@gmail.com",
                Password = "ducduc",
                PhoneNumber = "0123456789",
            }
        );

        modelBuilder.Entity<Token>().HasData(
            new Token
            {
                Id = 1,
                AccountId = 1,
                RefreshToken = "",
                RefreshTokenCreated = DateTime.Now,
                RefreshTokenExpired = DateTime.Now,
            }
        );
    }
}