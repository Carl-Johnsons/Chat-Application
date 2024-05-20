using ConversationService.Infrastructure.Persistence;

namespace ConversationService.Application.Conversations.Commands;

public record CreateIndividualConversationCommand : IRequest
{
    public Guid CurrentUserId { get; init; }
    public Guid OtherUserId { get; init; }
};


public class CreateIndividualConversationHandler : IRequestHandler<CreateIndividualConversationCommand>
{
    private readonly ApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateIndividualConversationHandler(ApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateIndividualConversationCommand request, CancellationToken cancellationToken)
    {
        var userId = request.CurrentUserId;
        var otherUserId = request.OtherUserId;

        var conversation = new Conversation
        {
            Type = CONVERSATION_TYPE_CODE.INDIVIDUAL
        };

        _context.Conversations.Add(conversation);

        ConversationUser cu = new()
        {
            ConversationId = conversation.Id,
            UserId = userId,
            Role = "Member",
        };
        _context.ConversationUsers.Add(cu);

        ConversationUser cou = new()
        {
            ConversationId = conversation.Id,
            UserId = otherUserId,
            Role = "Member",
        };
        _context.ConversationUsers.Add(cou);

        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
