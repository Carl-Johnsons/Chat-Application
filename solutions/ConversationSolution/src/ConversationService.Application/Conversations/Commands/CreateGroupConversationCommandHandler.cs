using System.ComponentModel.DataAnnotations;

namespace ConversationService.Application.Conversations.Commands;
public record CreateGroupConversationCommand : IRequest
{
    [Required]
    public CreateGroupConversationDTO CreateGroupConversationDTO { get; init; } = null!;
};

public class CreateGroupConversationCommandHandler : IRequestHandler<CreateGroupConversationCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    async Task IRequestHandler<CreateGroupConversationCommand>.Handle(CreateGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationWithMembersId = request.CreateGroupConversationDTO;

        _context.Conversations.Add(conversationWithMembersId);

        var leaderId = conversationWithMembersId.LeaderId;
        var membersId = conversationWithMembersId.MembersId;
        if (leaderId == null || membersId == null)
        {
            return;
        }

        _context.ConversationUsers.Add(new ConversationUser()
        {
            ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
            UserId = (Guid)leaderId,
            Role = "Leader",
        });

        foreach (var memberId in membersId)
        {
            if (memberId == leaderId)
            {
                continue;
            }
            _context.ConversationUsers.Add(new ConversationUser()
            {
                ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                UserId = memberId,
                Role = "Member",
            });
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
