
using Contract.Event.NotificationEvent;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;
public record JoinGroupConversationCommand : IRequest<Result>
{
    public Guid UserId { get; set; }
    public JoinGroupConversationDTO JoinConversationDTO { get; init; } = null!;
}
public class JoinGroupConversationCommandHandler : IRequestHandler<JoinGroupConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IServiceBus _serviceBus;

    public JoinGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, IServiceBus serviceBus)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _serviceBus = serviceBus;
    }

    public async Task<Result> Handle(JoinGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var dto = request.JoinConversationDTO;

        var group = await _context
                    .GroupConversation.Where(gc => gc.Id == dto.GroupId)
                    .SingleOrDefaultAsync(cancellationToken);
        if (group == null)
        {
            return Result.Failure(GroupConversationError.NotFound);
        }

        var invite = await _context
            .GroupConversationInvites.Where(gci => gci.Id == dto.InviteId)
            .SingleOrDefaultAsync(cancellationToken);

        if (invite == null)
        {
            return Result.Failure(GroupConversationError.NotFound);
        }
        if (invite.IsExpired)
        {
            return Result.Failure(GroupConversationError.InviteExpired);
        }

        var cu = await _context.ConversationUsers
                .Where(cu => cu.UserId == request.UserId && cu.ConversationId == dto.GroupId)
                .SingleOrDefaultAsync(cancellationToken);

        if (cu != null)
        {
            return Result.Failure(GroupConversationError.AlreadyJoinGroupConversation);
        }

        var conversationUser = new ConversationUser
        {
            ConversationId = dto.GroupId,
            Role = "Member",
            UserId = request.UserId,
        };
        _context.ConversationUsers.Add(conversationUser);

        await _unitOfWork.SaveChangeAsync(cancellationToken);

        await _serviceBus.Publish<CreateNotificationEvent>(new CreateNotificationEvent
        {
            ActionCode = "JOIN_CONVERSATION",
            ActorIds = [conversationUser.UserId],
            CategoryCode = "GROUP",
            Url = ""
        });

        return Result.Success();
    }
}
