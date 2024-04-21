namespace ConversationService.Domain.Interfaces;

public interface IBaseRepository<TEntity> where TEntity : BaseEntity
{
    void Add(TEntity entity);
    Task<List<TEntity>> GetAsync();
    Task<TEntity?> GetByIdAsync(int id);
    void Remove(TEntity entity);
    void Update(TEntity entity);
}