using MediatR;

namespace PostService.Application.Interactions.Commands;

public class CreateInteractionCommand : IRequest<Interaction>
{
    public string Value { get; init; } = null!;
}

public class CreateInteractionCommandHandler : IRequestHandler<CreateInteractionCommand, Interaction>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateInteractionCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Interaction> Handle(CreateInteractionCommand request, CancellationToken cancellationToken)
    {
        Interaction interaction = new Interaction 
        {
            Value = request.Value,
            Code = request.Value.ToUpper()
        };

        _context.Interactions.Add(interaction);
        await _unitOfWork.SaveChangeAsync();

        return interaction;
    }
}
