
using NotificationService.Infrastructure.Persistence.Mockup.Data;

namespace NotificationService.Infrastructure.Persistence.Mockup;

internal class MockupData
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public MockupData(ApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }


    public async Task SeedAllData()
    {
        await SeedNotificationCategoriesData();
    }

    private async Task SeedNotificationCategoriesData()
    {
        if (_context.NotificationCategories.Any())
        {
            return;
        }

        await Console.Out.WriteLineAsync("=================Begin seeding notification categories data=================");
        foreach (var category in NotificationCategoriesMockUp.Data)
        {
            _context.NotificationCategories.Add(new Domain.Entities.NotificationCategory
            {
                Code = category.Code,
                ImageUrl = category.ImageUrl,
            });
        }
        await _unitOfWork.SaveChangeAsync();
        await Console.Out.WriteLineAsync("=================Done seeding notification categories data=================");
    }
}
