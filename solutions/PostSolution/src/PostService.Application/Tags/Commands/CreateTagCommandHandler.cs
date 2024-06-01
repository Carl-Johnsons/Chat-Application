using MediatR;

namespace PostService.Application.Tags.Commands;

public class CreateTagCommand : IRequest<Tag>
{
    public string Value { get; init; }

}

public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand, Tag>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateTagCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Tag> Handle(CreateTagCommand request, CancellationToken cancellationToken)
    {
        Tag tags = new Tag { 
            Value = request.Value,
            Code = request.Value.ToUpper()
        };

        _context.Tags.Add(tags);
        await _unitOfWork.SaveChangeAsync();

        return tags;
    }
}
