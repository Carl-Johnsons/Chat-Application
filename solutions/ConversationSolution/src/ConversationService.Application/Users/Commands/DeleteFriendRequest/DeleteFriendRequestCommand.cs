namespace ConversationService.Application.Users.Commands.DeleteFriendRequest;

public record DeleteFriendRequestCommand(int SenderId, UserClaim UserClaim) : IRequest;
