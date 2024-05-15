﻿namespace ConversationService.Application.Conversations.Commands.CreateIndividualConversation;

public class CreateIndividualConversationCommandHandler : IRequestHandler<CreateIndividualConversationCommand>
{
    private readonly IConversationRepository _conversationRepository;
    private readonly IConversationUsersRepository _conversationUserRepository;
    private readonly IUnitOfWork _unitOfWork;


    public CreateIndividualConversationCommandHandler(IConversationRepository conversationRepository, IConversationUsersRepository conversationUserRepository, IUnitOfWork unitOfWork)
    {
        _conversationRepository = conversationRepository;
        _conversationUserRepository = conversationUserRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateIndividualConversationCommand request, CancellationToken cancellationToken)
    {
        var conversationWithMembersId = request.ConversationWithMembersId;

        _conversationRepository.Add(conversationWithMembersId);
        var leaderId = conversationWithMembersId.LeaderId;
        var membersId = conversationWithMembersId.MembersId;
        if (leaderId != null)
        {
            _conversationUserRepository.Add(new ConversationUser()
            {
                ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                UserId = (int)leaderId,
                Role = "Leader",
            });
        }
        if (membersId != null)
        {
            foreach (var memberId in membersId)
            {
                if (memberId == leaderId)
                {
                    continue;
                }
                _conversationUserRepository.Add(new ConversationUser()
                {
                    ConversationId = conversationWithMembersId.Id, //this prop will be filled after created by ef-core
                    UserId = memberId,
                    Role = "Member",
                });
            }
        }

        await _unitOfWork.SaveChangeAsync(cancellationToken);
    }
}