namespace ConversationService.Application.Conversations.Commands;

public record CreateIndividualConversationCommand : IRequest
{
    public string CurrentUserId { get; init; } = null!;
    public string OtherUserId { get; init; } = null!;
};


public class CreateIndividualConversationHandler : IRequestHandler<CreateIndividualConversationCommand>
{
    private readonly IConversationRepository _conversationRepository;
    private readonly IConversationUsersRepository _conversationUserRepository;
    private readonly IUnitOfWork _unitOfWork;


    public CreateIndividualConversationHandler(IConversationRepository conversationRepository, IConversationUsersRepository conversationUserRepository, IUnitOfWork unitOfWork)
    {
        _conversationRepository = conversationRepository;
        _conversationUserRepository = conversationUserRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateIndividualConversationCommand request, CancellationToken cancellationToken)
    {
        var userId = request.CurrentUserId;
        var otherUserId = request.OtherUserId;

        await Console.Out.WriteLineAsync("==================================");
        await Console.Out.WriteLineAsync(request.CurrentUserId);
        await Console.Out.WriteLineAsync(request.OtherUserId);
        await Console.Out.WriteLineAsync("==================================");

        var conversation = new Conversation
        {
            Type = CONVERSATION_TYPE_CODE.INDIVIDUAL
        };

        _conversationRepository.Add(conversation);

        ConversationUser cu = new()
        {
            ConversationId = conversation.Id,
            UserId = Guid.Parse(userId),
            Role = "Member",
        };
        _conversationUserRepository.Add(cu);

        ConversationUser cou = new()
        {
            ConversationId = conversation.Id,
            UserId = Guid.Parse(otherUserId),
            Role = "Member",
        };
        _conversationUserRepository.Add(cou);

        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}
