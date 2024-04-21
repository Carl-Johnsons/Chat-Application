namespace ConversationService.Application.Users.Commands.AddFriend;

public record AddFriendCommand(UserClaim CurrentUserClaim, int? ReceiverId) : IRequest<Conversation>;
