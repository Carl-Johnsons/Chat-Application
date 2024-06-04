using MediatR;

namespace PostService.Application.Tags.Commands;

public class UpdateTagCommand : IRequest<Tag>
{

    public Guid TagId { get; init; }
    public string Value { get; init; }

}

public class UpdateTagCommandHandler : IRequestHandler<UpdateTagCommand, Tag>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateTagCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Tag> Handle(UpdateTagCommand request, CancellationToken cancellationToken)
    {
        var tag = _context.Tags
                    .Where(c => c.Id == request.TagId)
                    .SingleOrDefault();
        if (tag != null)
        {
            tag.Value = request.Value;
            tag.Code = request.Value.ToUpper();
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return tag;
    }

}
