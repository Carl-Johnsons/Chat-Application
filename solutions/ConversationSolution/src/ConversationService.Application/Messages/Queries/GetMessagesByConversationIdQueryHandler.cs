using ConversationService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;
public record GetMessagesByConversationIdQuery : IRequest<PaginatedMessageListResponseDTO>
{
    public Guid ConversationId { get; init; }
    public int Skip { get; init; }
};

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, PaginatedMessageListResponseDTO>
{
    private readonly ApplicationDbContext _context;
    private readonly IPaginateDataUtility<Message, MessageListMetadata> _paginateDataUtility;

    public GetMessagesByConversationIdQueryHandler(ApplicationDbContext context, IPaginateDataUtility<Message, MessageListMetadata> paginateDataUtility)
    {
        _context = context;
        _paginateDataUtility = paginateDataUtility;
    }

    public async Task<PaginatedMessageListResponseDTO> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
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

        var messageList = await query.OrderBy(m => m.Id).ToListAsync();


        return new PaginatedMessageListResponseDTO
        {
            PaginatedData = messageList,
            Metadata = new MessageListMetadata
            {
                LastMessage = LastMessage
            }
        };
    }
}
