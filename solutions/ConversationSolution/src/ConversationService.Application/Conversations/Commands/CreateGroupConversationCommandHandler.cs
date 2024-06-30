using Contract.DTOs;
using Contract.Event.UploadEvent;
using Contract.Event.UploadEvent.EventModel;
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
    private readonly IServiceBus _serviceBus;

    public CreateGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, IServiceBus serviceBus)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _serviceBus = serviceBus;
    }

    public async Task<Result> Handle(CreateGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationWithMembersId = request.CreateGroupConversationDTO;
        var groupAvatar = conversationWithMembersId.ImageFile;

        var groupConversation = new GroupConversation
        {
            Name = conversationWithMembersId.Name,
            InviteURL = "link",
            Type = CONVERSATION_TYPE_CODE.GROUP,
        };

        if (groupAvatar != null)
        {
            var avtFileStreamEvent = new FileStreamEvent
            {
                FileName = groupAvatar.FileName,
                ContentType = groupAvatar.ContentType,
                Stream = new BinaryReader(groupAvatar.OpenReadStream()).ReadBytes((int)groupAvatar.Length)
            };

            var requestClientUpdate = _serviceBus.CreateRequestClient<UpdateFileEvent>();
            var response = await requestClientUpdate.GetResponse<UploadFileEventResponseDTO>(new UpdateFileEvent
            {
                FileStreamEvent = avtFileStreamEvent,
            });
            if (response != null)
            {
                groupConversation.ImageURL = response.Message.Url;
            }
        }

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
