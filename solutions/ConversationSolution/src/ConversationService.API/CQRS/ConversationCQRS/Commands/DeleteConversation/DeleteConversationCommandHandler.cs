using ConversationService.Infrastructure.Repositories;
using MediatR;

namespace ConversationService.API.CQRS.ConversationCQRS.Commands.DeleteConversation;

public class DeleteConversationCommandHandler : IRequestHandler<DeleteConversationCommand>
{
    private readonly ConversationRepository _conversationRepository = new();
    public Task Handle(DeleteConversationCommand request, CancellationToken cancellationToken)
    {
        _conversationRepository.Delete(request.ConversationId);
        return Task.CompletedTask;
    }
}
