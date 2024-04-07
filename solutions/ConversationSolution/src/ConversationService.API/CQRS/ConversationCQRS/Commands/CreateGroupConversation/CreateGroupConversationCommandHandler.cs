using ConversationService.Infrastructure.Repositories;
using ConversationService.Core.Entities;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Commands.CreateGroupConversation;

public class CreateGroupConversationCommandHandler : IRequestHandler<CreateGroupConversationCommand>
{
    private readonly ConversationRepository _conversationRepository = new();
    private readonly ConversationUsersRepository _conversationUserRepository = new();
    Task IRequestHandler<CreateGroupConversationCommand>.Handle(CreateGroupConversationCommand request, CancellationToken cancellationToken)
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

        return Task.CompletedTask;
    }
}
