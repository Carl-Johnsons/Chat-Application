using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;
public record GetMessagesByConversationIdQuery : IRequest<Result<PaginatedMessageListResponseDTO>>
{
    public Guid ConversationId { get; init; }
    public int Skip { get; init; }
};

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, Result<PaginatedMessageListResponseDTO>>
{
    private readonly IApplicationDbContext _context;
    private readonly IPaginateDataUtility<Message, MessageListMetadata> _paginateDataUtility;

    public GetMessagesByConversationIdQueryHandler(IApplicationDbContext context, IPaginateDataUtility<Message, MessageListMetadata> paginateDataUtility)
    {
        _context = context;
        _paginateDataUtility = paginateDataUtility;
    }

    public async Task<Result<PaginatedMessageListResponseDTO>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
    {
        var LastMessage = _context.Messages
                        .Where(m => m.ConversationId == request.ConversationId)
                        .OrderByDescending(m => m.Id)
                        .Take(1)
                        .SingleOrDefault();

        var query = _context.Messages
            .Where(m => m.ConversationId == request.ConversationId)
            .OrderByDescending(m => m.Id);

        query = (IOrderedQueryable<Message>)_paginateDataUtility.PaginateQuery(query, new PaginateParam
        {
            Offset = request.Skip * MESSAGE_CONSTANTS.LIMIT,
            Limit = MESSAGE_CONSTANTS.LIMIT
        });

        var messageList = await query.OrderBy(m => m.CreatedAt).ToListAsync();

        var paginatedResponse = new PaginatedMessageListResponseDTO
        {
            PaginatedData = messageList,
            Metadata = new MessageListMetadata
            {
                LastMessage = LastMessage
            }
        };
        return Result<PaginatedMessageListResponseDTO>.Success(paginatedResponse);
    }
}
