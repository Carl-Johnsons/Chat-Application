namespace ConversationService.Application.Users.Queries.GetFriendRequestBySenderId;

public record GetFriendRequestsBySenderIdQuery(int SenderId) : IRequest<List<FriendRequest>>;
