using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace ConversationService.Application.Conversations.Commands;

public record CreateConversationCommand : IRequest<Result<Conversation?>>
{
    [Required]
    public Guid UserId { get; init; }
    [Required]
    public Guid OtherUserId { get; init; }
}


public class CreateConversationCommandHandler : IRequestHandler<CreateConversationCommand, Result<Conversation?>>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly ISignalRService _signalRService;

    public CreateConversationCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, ISignalRService signalRService)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _signalRService = signalRService;
    }

    public async Task<Result<Conversation?>> Handle(CreateConversationCommand request, CancellationToken cancellationToken)
    {
        var query = from cu1 in _context.ConversationUsers
                    join cu2 in _context.ConversationUsers
                    on cu1.ConversationId equals cu2.ConversationId
                    join c in _context.Conversations
                    on cu1.ConversationId equals c.Id
                    where cu1.UserId == request.UserId
                          && cu2.UserId == request.OtherUserId
                          && c.Type == CONVERSATION_TYPE_CODE.INDIVIDUAL
                    select cu1.ConversationId;


        var isConversationExisted = await query.AnyAsync();
        if (isConversationExisted)
        {
            Result<Conversation>.Failure(ConversationError.AlreadyExistConversation);
        }

        var conversation = new Conversation
        {
            Type = CONVERSATION_TYPE_CODE.INDIVIDUAL,
        };
        _context.Conversations.Add(conversation);

        var conversationUsers = new List<ConversationUser> {
            new() {
                ConversationId = conversation.Id,
                UserId = request.UserId,
                Role="Member"
            },
            new() {
                ConversationId = conversation.Id,
                UserId = request.OtherUserId,
                Role="Member"
            },
        };
        _context.ConversationUsers.AddRange(conversationUsers);

        await _unitOfWork.SaveChangeAsync(cancellationToken);
        await _signalRService.InvokeAction(SignalREvent.JOIN_CONVERSATION_ACTION, new JoinConversationDTO
        {
            ConversationId = conversation.Id,
            MemberIds = [request.UserId, request.OtherUserId]
        });

        return Result<Conversation?>.Success(conversation);
    }
}
