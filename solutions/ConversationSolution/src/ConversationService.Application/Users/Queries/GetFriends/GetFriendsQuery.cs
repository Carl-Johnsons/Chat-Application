namespace ConversationService.Application.Users.Queries.GetFriends;

public record GetFriendsQuery(int UserId) : IRequest<List<Friend>>;
