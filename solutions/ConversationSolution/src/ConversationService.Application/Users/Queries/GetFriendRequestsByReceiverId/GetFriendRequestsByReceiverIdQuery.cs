namespace ConversationService.Application.Users.Queries.GetFriendRequestsByReceiverId;

public record GetFriendRequestsByReceiverIdQuery(int ReceiverId) : IRequest<List<FriendRequest>>;
