using System.ComponentModel.DataAnnotations;

namespace ConversationService.Application.Conversations.Commands;
public record CreateGroupConversationCommand : IRequest<Result>
{
    [Required]
    public Guid CurrentUserID { get; init; }

    [Required]
    public CreateGroupConversationDTO CreateGroupConversationDTO { get; init; } = null!;
};

public class CreateGroupConversationCommandHandler : IRequestHandler<CreateGroupConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreateGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationWithMembersId = request.CreateGroupConversationDTO;

        var groupConversation = new GroupConversation
        {
            ImageURL = conversationWithMembersId.ImageURL,
            Name = conversationWithMembersId.Name,
            InviteURL = "link",
            Type = CONVERSATION_TYPE_CODE.GROUP,
        };


        _context.Conversations.Add(groupConversation);

        var currentUserId = request.CurrentUserID;
        var membersId = conversationWithMembersId.MembersId;
        if (membersId == null || membersId.Count <= 1)
        {
            return GroupConversationError.NotEnoughMember;
        }

        _context.ConversationUsers.Add(new ConversationUser()
        {
            ConversationId = groupConversation.Id, //this prop will be filled after created by ef-core
            UserId = currentUserId,
            Role = "Leader",
        });

        foreach (var memberId in membersId)
        {
            if (memberId == currentUserId)
            {
                continue;
            }
            _context.ConversationUsers.Add(new ConversationUser()
            {
                ConversationId = groupConversation.Id, //this prop will be filled after created by ef-core
                UserId = memberId,
                Role = "Member",
            });
        }
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}
