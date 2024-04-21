namespace ConversationService.Application.Users.Commands.DeleteFriend;

public record DeleteFriendCommand(UserClaim UserClaim, int FriendId) : IRequest;
