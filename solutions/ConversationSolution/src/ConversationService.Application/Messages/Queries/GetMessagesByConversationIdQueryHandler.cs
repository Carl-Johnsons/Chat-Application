using ConversationService.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace ConversationService.Application.Messages.Queries;
public record GetMessagesByConversationIdQuery : IRequest<List<Message>>
{
    public Guid ConversationId { get; init; }
    public int Skip { get; init; }
};

public class GetMessagesByConversationIdQueryHandler : IRequestHandler<GetMessagesByConversationIdQuery, List<Message>>
{
    private readonly ApplicationDbContext _context;

    public GetMessagesByConversationIdQueryHandler(ApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<Message>> Handle(GetMessagesByConversationIdQuery request, CancellationToken cancellationToken)
    {
        Console.WriteLine("==================================");
        Console.WriteLine(request.ConversationId.ToString());
        Console.WriteLine(request.Skip);
        Console.WriteLine("==================================");

        return _context.Messages
            .Where(m => m.ConversationId == request.ConversationId)
            .ToListAsync();

        //return _context.Messages
        //    .Where(m => m.ConversationId == request.ConversationId)
        //    .OrderByDescending(m => m.Id)
        //    .Skip(request.Skip * MESSAGE_CONSTANTS.LIMIT)
        //    .Take(MESSAGE_CONSTANTS.LIMIT)
        //    .OrderBy(m => m.Id)
        //    .ToListAsync();
    }
}
