using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;

public record CreateIndividualConversationCommand : IRequest
{
    public Guid CurrentUserId { get; init; }
    public Guid OtherUserId { get; init; }
};


public class CreateIndividualConversationHandler : IRequestHandler<CreateIndividualConversationCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISignalRService _signalRService;

    public CreateIndividualConversationHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, ISignalRService signalRService)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _signalRService = signalRService;
    }

    public async Task Handle(CreateIndividualConversationCommand request, CancellationToken cancellationToken)
    {
        var userId = request.CurrentUserId;
        var otherUserId = request.OtherUserId;

        var isConversationExisted = _context.Conversations
                                    .Include(c => c.Users)
                                    .Where(c => c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL &&
                                                c.Users.Where(u => u.UserId == userId)
                                                       .SingleOrDefault() != null &&
                                                c.Users.Where(u => u.UserId == otherUserId)
                                                       .SingleOrDefault() != null)
                                    .SingleOrDefault() != null;
        if (isConversationExisted)
        {
            await Console.Out.WriteLineAsync("They already have the conversation, abort adding addition conversation");
            return;
        }

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

        await _signalRService.InvokeAction(SignalREvent.JOIN_CONVERSATION_ACTION, new JoinConversationDTO
        {
            MemberIds = [userId, otherUserId],
            ConversationId = conversation.Id
        });
    }
}
