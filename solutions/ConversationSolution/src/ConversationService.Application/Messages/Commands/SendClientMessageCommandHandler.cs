
using Contract.DTOs;
using Contract.Event.NotificationEvent;
using Contract.Event.UploadEvent;
using Contract.Event.UploadEvent.EventModel;
using Newtonsoft.Json;

namespace ConversationService.Application.Messages.Commands;

public record SendClientMessageCommand : IRequest<Result<Message>>
{
    public Guid SenderId { get; init; }
    public SendClientMessageDTO SendClientMessageDTO { get; init; } = null!;
};

public class SendClientMessageCommandHandler : IRequestHandler<SendClientMessageCommand, Result<Message>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISignalRService _signalRService;
    private readonly IServiceBus _serviceBus;

    public SendClientMessageCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, ISignalRService signalRService, IServiceBus serviceBus)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _signalRService = signalRService;
        _serviceBus = serviceBus;
    }


    public async Task<Result<Message>> Handle(SendClientMessageCommand request, CancellationToken cancellationToken)
    {
        var dto = request.SendClientMessageDTO;
        var isExistedConversation = _context.Conversations.Where(c => c.Id == dto.ConversationId).Any();

        if (!isExistedConversation)
        {
            return (Result<Message>)ConversationError.NotFound;
        }

        var message = new Message
        {
            SenderId = request.SenderId,
            ConversationId = dto.ConversationId,
            Content = dto.Content,
            Source = MESSAGE_CONSTANTS.Source.CLIENT,
            Active = true,
            AttachedFilesURL = "[]",
        };

        //check file array has element
        if (dto.Files != null && dto.Files.Count > 0)
        {
            var fileStreamEventList = new List<FileStreamEvent>();

            foreach (var file in dto.Files)
            {
                fileStreamEventList.Add(new FileStreamEvent
                {
                    FileName = file.FileName,
                    ContentType = file.ContentType,
                    Stream = new BinaryReader(file.OpenReadStream()).ReadBytes((int)file.Length)
                });
            }

            var requestClient = _serviceBus.CreateRequestClient<UploadMultipleFileEvent>();
            var response = requestClient.GetResponse<UploadMultipleFileEventResponseDTO>(new UploadMultipleFileEvent
            {
                FileStreamEvents = fileStreamEventList
            });
            if (response != null)
            {
                message.AttachedFilesURL = JsonConvert.SerializeObject(response.Result.Message.Files);
            }
        }

        _context.Messages.Add(message);

        await _unitOfWork.SaveChangeAsync(cancellationToken);

        await _signalRService.InvokeAction(SignalREvent.SEND_MESSAGE_ACTION, message);

        if (dto.UserTaggedId != null)
        {
            
                await _serviceBus.Publish<CreateNotificationEvent>(new CreateNotificationEvent
                {
                    ActionCode = "POST_USER_TAG",
                    ActorIds = dto.UserTaggedId,
                    CategoryCode = ""
                });
            
        }

        return Result<Message>.Success(message);
    }

}
