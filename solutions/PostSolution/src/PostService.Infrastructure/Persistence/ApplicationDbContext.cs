﻿using PostService.Domain.Entities;
using Interaction = PostService.Domain.Entities.Interaction;

namespace PostService.Infrastructure.Persistence;

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

    public DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<PostComment> PostComments { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Interaction> Interactions { get; set; }
    public DbSet<PostInteract> PostInteracts { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<PostReport> PostReports { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        DotNetEnv.Env.Load();
        var server = DotNetEnv.Env.GetString("SERVER", "Not found").Trim();
        var db = DotNetEnv.Env.GetString("DB", "Not found").Trim();
        var pwd = DotNetEnv.Env.GetString("SA_PASSWORD", "Not found").Trim();

        var connectionString = $"Server={server};Database={db};User Id=sa;Password='{pwd}';TrustServerCertificate=true;MultipleActiveResultSets=True";
        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Post>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<PostReport>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });


        modelBuilder.Entity<Interaction>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<Tag>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });

        modelBuilder.Entity<Comment>(entity =>
        {
            entity.Property(e => e.CreatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
            entity.Property(e => e.UpdatedAt)
                  .HasConversion(v => v.ToUniversalTime(),
                                 v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
        });
    }
}
