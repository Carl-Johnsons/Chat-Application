namespace ConversationService.Infrastructure.Persistence.Repositories;

internal abstract class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
{
    protected readonly ApplicationDbContext _context;

    protected BaseRepository(ApplicationDbContext context)
    {
        _context = context;
    }
    public Task<List<TEntity>> GetAsync()
    {
        return _context.Set<TEntity>().ToListAsync();
    }
    public Task<TEntity?> GetByIdAsync(Guid id)
    {
        return _context.Set<TEntity>().SingleOrDefaultAsync(c => c.Id == id);
    }
    public void Add(TEntity entity)
    {
        _context.Set<TEntity>().Add(entity);
    }
    public void Update(TEntity entity)
    {
        _context.Set<TEntity>().Update(entity);
    }
    public void Remove(TEntity entity)
    {
        _context.Set<TEntity>().Remove(entity);
    }
}
