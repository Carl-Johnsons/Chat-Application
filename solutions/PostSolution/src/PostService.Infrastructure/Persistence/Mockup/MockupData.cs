using PostService.Domain.Entities;
using PostService.Infrastructure.Persistence.Mockup.Data;

namespace PostService.Infrastructure.Persistence.Mockup;

internal class MockupData
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    public MockupData(ApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task SeedTagData()
    {
        await Console.Out.WriteLineAsync("=================Begin seeding tag data=================");
        foreach (var tag in TagData.Data)
        {
            var id = Guid.Parse(tag.Id);
            var value = tag.Value;
            var code = tag.Code;

            var isTagExisteed = _context.Tags
                                        .Where(t => t.Id == id && t.Value == value)
                                        .SingleOrDefault() != null;

            if (isTagExisteed)
            {
                await Console.Out.WriteLineAsync($"Tag {value} is already exited");
                continue;
            }
            Tag tag1 = new Tag{
                Id = id,
                Value = value,
                Code = code
            };            
            _context.Tags.Add(tag1);
            await Console.Out.WriteLineAsync($"Added Tag {value}");
        }
        await _unitOfWork.SaveChangeAsync();
        await Console.Out.WriteLineAsync("=================DONE seeding add data=================");
    }
}
