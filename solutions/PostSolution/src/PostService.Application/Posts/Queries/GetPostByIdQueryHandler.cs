using MediatR;
using Microsoft.EntityFrameworkCore;
using PostService.Domain.DTOs;
using PostService.Domain.Entities;
namespace PostService.Application.Posts.Queries;

public class GetPostByIdQuery : IRequest<PostDTO>
{
    public Guid Id { get; set; }
}

public class GetPostByIdQueryHandler : IRequestHandler<GetPostByIdQuery, PostDTO>
{
    private readonly IApplicationDbContext _context;

    public GetPostByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<PostDTO> Handle(GetPostByIdQuery request, CancellationToken cancellationToken)
    {
        var post = await _context.Posts
                    .Where(p => p.Id == request.Id)
                    .SingleOrDefaultAsync();

        var tag = await _context.PostTags
                    .Where(t => t.PostId == request.Id)
                    .Include(t => t.Tag)
                    .ToListAsync();

        var countInteract = await _context.PostInteracts
                    .Where(pi => pi.PostId == request.Id)
                    .CountAsync();

        List<string> tags = new List<string>();

        foreach (PostTag t in tag)
        {
            tags.Add(t.Tag.Value);
        }

        var topInteractions = await _context.PostInteracts
                    .Where(pi => pi.PostId == request.Id)
                    .GroupBy(pi => pi.InteractionId)
                    .Select(g => new PostInteractionCountDTO
                    {
                        InteractionId = g.Key,
                        Count = g.Count(),
                        Value = _context.Interactions.FirstOrDefault(iv => iv.Id == g.Key)!.Value
                    })
                    .OrderByDescending(pi => pi.Count)
                    .Take(3)
                    .ToListAsync();

        List<string> interacts = new List<string>();

        foreach (var t in topInteractions)
        {
            interacts.Add(t.Value);
        }

        var postReponse = new PostDTO
        {
            PostId = request.Id,
            Content = post.Content,
            UserId = post.UserId,
            CreatedAt = post.CreatedAt,
            InteractTotal = countInteract,
            Interactions = interacts,
            Tags = tags
        };

        return postReponse;
    }
}
