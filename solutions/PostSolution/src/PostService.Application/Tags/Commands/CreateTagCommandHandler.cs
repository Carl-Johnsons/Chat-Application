using MediatR;

namespace PostService.Application.Tags.Commands;

public class CreateTagCommand : IRequest
{
    public string Value { get; init; } = null!;

}

public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateTagCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateTagCommand request, CancellationToken cancellationToken)
    {

        var tag = _context.Tags
                .Where(t =>  t.Value == request.Value.Trim())
                .FirstOrDefault();

        if (tag == null)
        {
            Tag tags = new Tag
            {
                Value = request.Value.Trim(),
                Code = request.Value.ToUpper()
            };
            _context.Tags.Add(tags);
        }

            
        await _unitOfWork.SaveChangeAsync();

    }
}
