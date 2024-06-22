using PostService.Domain.Entities;

namespace PostService.Domain.Interfaces;


public interface IApplicationDbContext : IDbContext
{
    DbSet<Post> Posts { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<PostComment> PostComments { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Interaction> Interactions { get; set; }
    public DbSet<PostInteract> PostInteracts { get; set; }
    public DbSet<PostTag> PostTags { get; set; }
    public DbSet<PostReport> PostReports { get; set; }
}
