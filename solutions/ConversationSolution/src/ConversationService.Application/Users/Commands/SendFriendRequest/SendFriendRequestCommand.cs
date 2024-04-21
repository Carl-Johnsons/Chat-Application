namespace ConversationService.Application.Users.Commands.SendFriendRequest;

public record SendFriendRequestCommand(FriendRequest FriendRequest) : IRequest;
