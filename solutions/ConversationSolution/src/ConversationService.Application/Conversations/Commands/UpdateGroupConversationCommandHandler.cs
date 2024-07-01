
using Contract.DTOs;
using Contract.Event.UploadEvent.EventModel;
using Contract.Event.UploadEvent;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Conversations.Commands;

public record UpdateGroupConversationCommand : IRequest<Result>
{
    public UpdateGroupConversationDTO UpdateGroupConversationDTO { get; init; } = null!;
}


public class UpdateGroupConversationCommandHandler : IRequestHandler<UpdateGroupConversationCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IServiceBus _serviceBus;

    public UpdateGroupConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, IServiceBus serviceBus)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _serviceBus = serviceBus;
    }

    public async Task<Result> Handle(UpdateGroupConversationCommand request, CancellationToken cancellationToken)
    {
        var dto = request.UpdateGroupConversationDTO;

        var group = await _context
                    .GroupConversation.Where(gc => gc.Id == dto.Id)
                    .SingleOrDefaultAsync();
        if (group == null)
        {
            return Result.Failure(GroupConversationError.NotFound);
        }

        if (dto.Name != null) group.Name = dto.Name;
        if (dto.MembersId != null)
        {
            foreach (var memberId in dto.MembersId)
            {
                _context.ConversationUsers.Add(new ConversationUser
                {
                    UserId = memberId,
                    ConversationId = dto.Id,
                    Role = "Member",
                });
            }
        }
        if (dto.ImageFile != null)
        {
            var avtFileStreamEvent = new FileStreamEvent
            {
                FileName = dto.ImageFile.FileName,
                ContentType = dto.ImageFile.ContentType,
                Stream = new BinaryReader(dto.ImageFile.OpenReadStream()).ReadBytes((int)dto.ImageFile.Length)
            };

            var requestClientUpdate = _serviceBus.CreateRequestClient<UpdateFileEvent>();
            var response = await requestClientUpdate.GetResponse<UploadFileEventResponseDTO>(new UpdateFileEvent
            {
                FileStreamEvent = avtFileStreamEvent,
                Url = group.ImageURL ?? ""
            });
            if (response != null)
            {
                group.ImageURL = response.Message.Url;
            }
        }

        _context.GroupConversation.Update(group);
        await _unitOfWork.SaveChangeAsync(cancellationToken);

        return Result.Success();
    }
}
